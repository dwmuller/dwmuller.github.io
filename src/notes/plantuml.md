---
title: Using PlantUML
---

# {{ title }}

On Linux, by default, the Java engine will try to connect to X. This is a problem when trying 
to run the PlantUML CLI non-interactively. The quick fix is to include a Java option in the
command line to force "headless mode". Example:

```
plantuml -Djava.awt.headless=true -tpnt my-uml-file.plantuml
```
