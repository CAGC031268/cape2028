import urllib.request
import re

url = "https://www.duoc.cl/escuela/informatica-telecomunicaciones/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        # Find logo
        logos = re.findall(r'src="([^"]*logo[^"]*)"', html, re.IGNORECASE)
        print("Logos found:", set(logos))
        # Find some colors in styles
        colors = re.findall(r'#[0-9a-fA-F]{3,6}', html)
        from collections import Counter
        print("Most common colors:", Counter(colors).most_common(10))
except Exception as e:
    print("Error:", e)
