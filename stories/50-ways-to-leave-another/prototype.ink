// 50 Ways to Leave Another — first interactive slice
// Persistent state is intentionally more important than branch count.

VAR trust = 0
VAR freedom = 0
VAR control = 0

-> start

=== start ===

The sky castle is burning.

Violet stands at the controls of *The Nebuchadnezzar*.
Sebastien enters the bridge expecting a princess.
Instead, he finds someone already trying to leave.

"Do you know how to fly this thing?"

+ [Tell him the truth.] -> truth
+ [Tell him what he wants to hear.] -> performance
+ [Ask him why he wants to fly it.] -> question

=== truth ===
~ trust += 1
~ freedom += 1

"I don't know."

Sebastien pauses.

"You're the princess."

"That doesn't mean I know how to fly."

-> airship

=== performance ===
~ freedom += 1
~ control += 1

"Of course."

Sebastien studies her face.
He does not believe her.

-> airship

=== question ===
~ trust += 2
~ control -= 1

"Why do you want to fly this?"

For once, Sebastien is the one being asked to explain himself.

-> airship

=== airship ===

The ship rises.

The immediate choice is over.
The choice has not disappeared.

{ trust >= 2:
    Sebastien lowers his weapon.
    He is listening now.
- else:
    Sebastien keeps one hand near his weapon.
}

{ control >= 1:
    Violet notices that he answered her question by watching her instead.
- else:
    Violet takes the controls without asking permission.
}

{ freedom >= 1:
    The castle falls away beneath them.
    For one breath, nobody owns the direction of the ship.
}

-> next_choice

=== next_choice ===

The storm opens ahead.

There are three ways out of the immediate crisis.
None of them is the same as being free.

+ [Leave the person who expects me to stay.] -> leave_person
+ [Leave the role they assigned me.] -> leave_role
+ [Leave the story they wrote for me.] -> leave_story

=== leave_person ===
~ freedom += 1

Violet looks at Sebastien.

"You wanted the ship."

"And you?"

"I wanted to know whether I could leave without becoming someone else's prisoner."

-> convergence

=== leave_role ===
~ freedom += 2
~ control -= 1

Violet removes the royal insignia from her coat.

It is a small gesture.
It feels larger than the castle behind them.

-> convergence

=== leave_story ===
~ freedom += 2
~ trust += 1

Violet looks at the cards, contracts, prophecies, and plans that were prepared for her.

"I am not the ending you were waiting for."

She lets the papers go.

-> convergence

=== convergence ===

{ freedom >= 3 and control <= 0:
    Sebastien: "So what happens now?"
    Violet: "We find out what we choose when nobody has chosen it for us."
- trust >= 2:
    Sebastien: "I still don't understand you."
    Violet: "Good. Keep asking."
- else:
    Sebastien: "You really think you can change this?"
    Violet: "I think I can stop pretending it cannot be changed."
}

The ship disappears into the storm.

// Prototype endpoint.
-> END
