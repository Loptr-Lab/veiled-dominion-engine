# UNITY_PROJECT_SETUP — Superseded

> **This file has been superseded.**
> The canonical Unity setup guide for engine contributors is:
> **[`docs/UNITY_INIT.md`](./UNITY_INIT.md)**
>
> `UNITY_INIT.md` covers environment specs, folder structure, C# script integration,
> grey-box scene setup, and the first milestone for the Unity prototype.
> This file is retained for reference only and should not be updated.

---

<!-- Original content preserved below for reference -->

# Unity 2022 LTS + URP Project Setup Guide

## 🎮 Project Configuration

**Engine Version:** Unity 2022 LTS (or later)  
**Render Pipeline:** Universal Render Pipeline (URP)  
**Target Platform:** WebGL (Primary), Windows/Mac (Secondary)  
**Scripting Backend:** .NET 6+ (IL2CPP for WebGL)

---

## 📁 Project Folder Structure

```
veiled-dominion-engine/
├── Assets/
│   ├── Scripts/
│   │   ├── Core/
│   │   │   ├── GridTopology.cs
│   │   │   └── BasePiece.cs
│   │   ├── Systems/
│   │   │   ├── RadiusOfRuin.cs
│   │   │   ├── VeiledStateManager.cs
│   │   │   ├── BoardManager.cs
│   │   │   └── TurnManager.cs
│   │   ├── UI/
│   │   │   ├── VeiledIndicator.cs
│   │   │   ├── LeadershipPointTracker.cs
│   │   │   └── TurnPhaseDisplay.cs
│   │   └── Input/
│   │       ├── PlayerInput.cs
│   │       └── PieceSelector.cs
│   ├── Prefabs/
│   │   ├── Pieces/
│   │   │   ├── Pawn.prefab
│   │   │   ├── Rook.prefab
│   │   │   ├── Knight.prefab
│   │   │   ├── Bishop.prefab
│   │   │   ├── Queen.prefab
│   │   │   ├── Leader.prefab
│   │   │   ├── Rebirth.prefab
│   │   │   └── Death.prefab
│   │   ├── Board/
│   │   │   └── GameBoard.prefab
│   │   └── UI/
│   │       ├── VeiledStatusPanel.prefab
│   │       └── LeadershipPointPanel.prefab
│   ├── Materials/
│   │   ├── Pieces/
│   │   │   ├── StandardPiece.mat
│   │   │   ├── Rebirth_Glow.mat
│   │   │   ├── Death_MusouBlack.mat
│   │   │   └── Pawn_Black.mat
│   │   └── Board/
│   │       └── BoardDarkGrey.mat
│   ├── Shaders/
│   │   ├── MusouBlack.shader
│   │   ├── RebirthGlow.shader
│   │   └── TranslucentResin.shader
│   ├── Scenes/
│   │   ├── GreyBox_Prototype.unity
│   │   ├── MainMenu.unity
│   │   └── GameBoard.unity
│   ├── Settings/
│   │   └── URP_GreyBoxSettings.asset
│   └── Textures/
│       └── (placeholder for future asset imports)
├── ProjectSettings/
├── Packages/
├── .gitignore
├── README.md
└── CONTRIBUTING.md
```

---

## 🚀 Initial Setup Steps

### Step 1: Create the Unity Project

```bash
# Using Unity Hub or command line:
unity -createProject ./veiled-dominion-engine -setDefaultGraphicsAPI d3d11
```

**Or manually:**
1. Open Unity Hub
2. Create New Project → **3D (URP)**
3. Set Project Name: `veiled-dominion-engine`
4. Set Location: Your repository root
5. Click Create

### Step 2: Import C# Scripts

1. Create the folder structure above in `Assets/Scripts/`
2. Copy your C# files from the repository root `/src/` into their respective locations:
   ```
   /src/board/GridTopology.cs          → Assets/Scripts/Core/
   /src/pieces/BasePiece.cs            → Assets/Scripts/Core/
   /src/systems/RadiusOfRuin.cs        → Assets/Scripts/Systems/
   /src/systems/VeiledStateManager.cs  → Assets/Scripts/Systems/
   ```

3. Update the namespaces in the script imports:
   ```csharp
   // At the top of each script, update:
   using VeiledDominion.Board;      // GridTopology
   using VeiledDominion.Pieces;     // BasePiece
   using VeiledDominion.Systems;    // RadiusOfRuin, VeiledStateManager
   ```

### Step 3: Configure URP Settings

1. **Project Settings → Graphics**
   - Render Pipeline Asset: Create a new URP asset (or use the default)
   - Quality Levels → All levels should use the URP asset

2. **Create URP Forward Renderer**
   - Assets/Settings/URP_GreyBoxSettings.asset
   - Set these rendering features:
     - Screen Space Shadows: Disabled (for performance)
     - Depth Normal Prepass: Enabled (for custom shaders)

3. **Quality Settings**
   - Set Pixel Light Count to 2 (one directional + one point light)
   - Disable post-processing for prototype phase

### Step 4: Verify C# Compilation

1. Open the **Console** window (Window → General → Console)
2. If there are compilation errors, they'll appear here
3. Most likely issue: **Namespace mismatches** — ensure `using` statements match

---

## 🎨 Material & Shader Setup (Priority Order)

### Material 1: Standard Pawn (Black Cube)
- **Base Color:** `#050505` (Pure Black)
- **Metallic:** 0
- **Smoothness:** 0.2 (Matte)
- **Emission:** Disabled

### Material 2: Death (Musou Black Sphere)
- **Shader:** Custom `MusouBlack.shader` (see Shader code below)
- **Base Color:** `#000000`
- **Metallic:** 0
- **Smoothness:** 1.0
- **Specular Intensity:** 0 (custom shader parameter)
- *Expected Result:* Appears as a black hole that absorbs all light

### Material 3: Rebirth (Glowing Amber Sphere)
- **Shader:** Custom `RebirthGlow.shader`
- **Base Color:** `#000000` (Black albedo)
- **Emission Color:** `#D4A853` (Amber)
- **Emission Intensity:** 3.0+
- *Expected Result:* Glowing lightbulb effect

### Shader Code: MusouBlack.shader
```hlsl
Shader "Custom/MusouBlack"
{
    Properties
    {
        _BaseColor("Base Color", Color) = (0, 0, 0, 1)
        _SpecularIntensity("Specular Intensity", Range(0, 1)) = 0
    }
    
    SubShader
    {
        Tags { "RenderType"="Opaque" "Queue"="Geometry" }
        
        Pass
        {
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            
            struct Attributes
            {
                float4 positionOS : POSITION;
            };
            
            struct Varyings
            {
                float4 positionCS : SV_POSITION;
            };
            
            Varyings vert(Attributes input)
            {
                Varyings output;
                output.positionCS = TransformObjectToHClip(input.positionOS.xyz);
                return output;
            }
            
            half4 frag(Varyings input) : SV_Target
            {
                return half4(0, 0, 0, 1); // Pure black, no shading
            }
            ENDHLSL
        }
    }
}
```

### Shader Code: RebirthGlow.shader
```hlsl
Shader "Custom/RebirthGlow"
{
    Properties
    {
        _BaseColor("Base Color", Color) = (0, 0, 0, 1)
        _EmissionColor("Emission Color", Color) = (0.831, 0.659, 0.325, 1)
        _EmissionIntensity("Emission Intensity", Range(0, 5)) = 3
    }
    
    SubShader
    {
        Tags { "RenderType"="Opaque" }
        
        Pass
        {
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Lighting.hlsl"
            
            struct Attributes
            {
                float4 positionOS : POSITION;
                float3 normalOS : NORMAL;
            };
            
            struct Varyings
            {
                float4 positionCS : SV_POSITION;
                float3 normalWS : TEXCOORD0;
                float3 positionWS : TEXCOORD1;
            };
            
            float4 _EmissionColor;
            float _EmissionIntensity;
            
            Varyings vert(Attributes input)
            {
                Varyings output;
                output.positionCS = TransformObjectToHClip(input.positionOS.xyz);
                output.normalWS = TransformObjectToWorldNormal(input.normalOS);
                output.positionWS = TransformObjectToWorld(input.positionOS.xyz);
                return output;
            }
            
            half4 frag(Varyings input) : SV_Target
            {
                half3 emission = _EmissionColor.rgb * _EmissionIntensity;
                return half4(emission, 1);
            }
            ENDHLSL
        }
    }
}
```

---

## 🎬 Scene Setup: GreyBox_Prototype.unity

### Hierarchy Structure
```
Scene: GreyBox_Prototype
├── Lighting
│   ├── DirectionalLight (intensity 0.3, pointing down)
│   └── PointLight_Rebirth (amber #D4A853, intensity 3.0, 1 unit above origin)
├── Environment
│   └── Camera (positioned at (7, 10, 7) to view the board)
├── GameBoard
│   └── BoardPlane (14×14, dark grey #1A1A1A)
├── Pieces
│   ├── Rebirth_Sphere (Amber, glowing)
│   ├── Death_Sphere (Black, Musou Black shader)
│   ├── Pawn_Cubes (x8, black, for each faction)
│   └── (Other pieces as needed for testing)
└── UI Canvas (for future turn indicators)
```

### Camera Settings
```
Position: (7, 10, 7) — Isometric view of the board
Rotation: (45, 45, 0)
FOV: 60
```

### Lighting Settings
1. **Directional Light**
   - Intensity: 0.3
   - Color: White
   - Direction: Straight down (0, -1, 0)

2. **Point Light (Rebirth)**
   - Intensity: 3.0
   - Color: Amber `#D4A853`
   - Position: (7, 1, 7) — 1 unit above board origin
   - Range: 15
   - Shadow: Enabled

---

## ⚙️ Compiler Error Troubleshooting

| Error | Solution |
|-------|----------|
| `CS0246: The type or namespace name 'GridCoordinate' could not be found` | Ensure `GridTopology.cs` is in `Scripts/Core/` and `using VeiledDominion.Board;` is at the top |
| `CS0246: The type or namespace name 'BasePiece' could not be found` | Ensure `BasePiece.cs` is in `Scripts/Core/` and `using VeiledDominion.Pieces;` is at the top |
| `Assembly-CSharp-Editor: error CS0103: The name 'RadiusOfRuin' does not exist` | Verify `RadiusOfRuin.cs` is in `Scripts/Systems/` and namespace is correct |

---

## 🧪 First Playtest: Aura Trigger Test

1. **Create Trigger Test Script** (`Assets/Scripts/Test/AuraColliderTest.cs`):
   ```csharp
   using UnityEngine;
   
   public class AuraColliderTest : MonoBehaviour
   {
       private void OnTriggerEnter(Collider other)
       {
           Debug.Log($"[AURA TEST] Piece entered trigger: {other.gameObject.name}");
       }
       
       private void OnTriggerExit(Collider other)
       {
           Debug.Log($"[AURA TEST] Piece exited trigger: {other.gameObject.name}");
       }
   }
   ```

2. **Attach to Rebirth's Trigger Collider**
3. **Drag a black Pawn cube into the trigger area**
4. **Check Console for debug messages**

---

## 📦 WebGL Export (Future Phase)

Once the grey-box is complete, exporting to WebGL is straightforward:

```
File → Build Settings → WebGL → Build
```

Unity will generate an HTML file playable in any browser. Perfect for embedding on Open Collective.

---

**Status:** Ready for grey-box scene creation  
**Next Step:** Create the scene, place primitives, configure materials, post screenshot

🎯 Let's see the grid glow.
