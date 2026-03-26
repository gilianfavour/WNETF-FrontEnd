import os
import shutil
import subprocess
import sys

site_packages = r'C:\Users\ALADINA\AppData\Local\Programs\Python\Python313\Lib\site-packages'
decouple_folder = os.path.join(site_packages, 'decouple')
decouple_info = os.path.join(site_packages, 'decouple-0.0.7.dist-info')

print(f"Checking for {decouple_folder}...")
if os.path.exists(decouple_folder):
    print(f"Removing {decouple_folder}...")
    shutil.rmtree(decouple_folder)
    print("DONE.")

print(f"Checking for {decouple_info}...")
if os.path.exists(decouple_info):
    print(f"Removing {decouple_info}...")
    shutil.rmtree(decouple_info)
    print("DONE.")

print("Attempting to install python-decouple...")
subprocess.run([sys.executable, "-m", "pip", "install", "python-decouple==3.8"], check=True)
print("SUCCESS.")
