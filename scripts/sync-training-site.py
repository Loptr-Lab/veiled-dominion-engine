"""Publish the training repo's docs under the branded site; do not author copies here."""
from pathlib import Path
import sys, subprocess, re, json, shutil
from html import escape
source=Path(sys.argv[1]).resolve()
root=Path(__file__).resolve().parents[1]
assert (source/'docs/index.html').is_file(), 'Pass a checkout of Loptr-Lab/training'
commit=subprocess.check_output(['git','-C',str(source),'rev-parse','HEAD'],text=True).strip()
target=root/'training'
origin='https://loptrlab.com/training/'
urls=[]
for item in sorted((source/'docs').rglob('*')):
 if not item.is_file(): continue
 rel=item.relative_to(source/'docs')
 out=target/rel; out.parent.mkdir(parents=True,exist_ok=True)
 text=item.read_text().replace('https://loptr-lab.github.io/training/',origin)
 if item.suffix=='.html':
  path=rel.as_posix()
  if path.endswith('index.html'): path=path[:-10]
  url=origin+path
  text=re.sub(r'<link\b(?=[^>]*rel=["\']canonical["\'])[^>]*>','',text,flags=re.I)
  text=text.replace('</head>',f'<link rel="canonical" href="{escape(url,quote=True)}">\n</head>',1)
  urls.append(url)
 out.write_text(text)
# Eliminate the legacy Jekyll redirect document that competed for /training/.
old=target/'index.md'
if old.exists(): old.unlink()
(target/'publication-source.json').write_text(json.dumps({'repository':'Loptr-Lab/training','commit':commit,'source_directory':'docs','canonical_base':origin,'generated_by':'scripts/sync-training-site.py'},indent=2)+'\n')
sitemap='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+''.join('  <url><loc>'+u+'</loc></url>\n' for u in urls)+'</urlset>\n'
(target/'sitemap.xml').write_text(sitemap)
main=root/'sitemap.xml'
s=main.read_text()
s=re.sub(r'\s*<url><loc>https://loptrlab\.com/training/[^<]*</loc></url>','',s)
s=s.replace('</urlset>', ''.join('  <url><loc>'+u+'</loc></url>\n' for u in urls)+'</urlset>')
main.write_text(s)
print(f'Published {len(urls)} training pages from {commit}')
