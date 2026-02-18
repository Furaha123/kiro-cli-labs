# Creating Visual Architecture Diagrams

## Quick Start - View Mermaid Diagrams

The `ARCHITECTURE.md` file contains **Mermaid diagrams** that render automatically on:
- ✅ GitHub
- ✅ GitLab
- ✅ VS Code (with Mermaid extension)
- ✅ Many markdown viewers

Just open `ARCHITECTURE.md` to see the visual diagrams!

---

## Option 1: draw.io (Recommended)

### Open the Diagram
1. Go to https://app.diagrams.net/
2. Click **File → Open From → Device**
3. Select `architecture-diagram.drawio`
4. The diagram will open with AWS icons

### Edit the Diagram
- Drag and drop AWS icons from the left panel
- Search for "AWS" to find more icons
- Export as PNG/SVG: **File → Export as → PNG/SVG**

### Add Official AWS Icons
1. Click **More Shapes** (bottom left)
2. Search for **"AWS19"** or **"AWS Architecture 2021"**
3. Enable the library
4. All official AWS icons are now available

---

## Option 2: Create from Scratch with AWS Icons

### Using draw.io

1. **Start New Diagram**
   - Go to https://app.diagrams.net/
   - Click **Create New Diagram**
   - Choose **Blank Diagram**

2. **Enable AWS Icons**
   - Click **More Shapes** (bottom left)
   - Search: **AWS19**
   - Check the box to enable
   - Click **Apply**

3. **Find Icons**
   - Search in left panel:
     - "CloudFront" → Amazon CloudFront
     - "S3" → Amazon S3 Bucket
     - "IAM" → AWS Identity and Access Management (for OAC)
     - "Users" → Users icon

4. **Build the Diagram**
   ```
   Users → CloudFront → OAC → S3 Bucket
   ```

5. **Export**
   - **File → Export as → PNG** (for documentation)
   - **File → Export as → SVG** (for scalable graphics)

---

## Option 3: AWS Official Tools

### AWS Architecture Icons (PowerPoint/Visio)

1. **Download Icons**
   - Visit: https://aws.amazon.com/architecture/icons/
   - Download **AWS Architecture Icons** (ZIP file)
   - Extract the ZIP

2. **Use in PowerPoint**
   - Open PowerPoint
   - Insert icons from extracted folder
   - Create your architecture diagram
   - Export as PNG/PDF

3. **Use in Visio**
   - Open Microsoft Visio
   - Import AWS stencils
   - Drag and drop icons
   - Export as PNG/PDF

---

## Option 4: Online Tools

### Lucidchart
1. Go to https://www.lucidchart.com/
2. Sign up (free tier available)
3. **Create New → AWS Architecture**
4. AWS icons are pre-loaded
5. Drag and drop to build diagram
6. Export as PNG/PDF

### Cloudcraft (3D AWS Diagrams)
1. Go to https://www.cloudcraft.co/
2. Sign up (free tier available)
3. Build 3D AWS architecture
4. Export as PNG/PDF

---

## Recommended Diagram Layout

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  [Users Icon]                                          │
│       ↓                                                │
│  [CloudFront Icon] ← Global Edge Locations            │
│       ↓                                                │
│  [IAM/OAC Icon] ← Origin Access Control               │
│       ↓                                                │
│  [S3 Bucket Icon] ← Private Bucket                    │
│       • sudoku.html                                    │
│       • style.css                                      │
│       • script.js                                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Color Scheme (AWS Brand Colors)

- **AWS Orange**: `#FF9900` (CloudFront, AWS Cloud border)
- **S3 Green**: `#569A31` (S3 Bucket)
- **IAM Purple**: `#759C3E` (OAC, Policies)
- **Dark Gray**: `#232F3E` (Text, Icons)

---

## Export Settings

### For Documentation (PNG)
- Resolution: 300 DPI
- Background: White or Transparent
- Size: 1920x1080 or larger

### For Presentations (SVG)
- Vector format (scales perfectly)
- Smaller file size
- Editable in Illustrator/Inkscape

### For Web (PNG)
- Resolution: 150 DPI
- Optimize for web
- Size: 1200x800

---

## Quick Commands

### View Mermaid in VS Code
```bash
# Install Mermaid extension
code --install-extension bierner.markdown-mermaid

# Open ARCHITECTURE.md
code terraform/ARCHITECTURE.md
```

### Convert Mermaid to PNG (using CLI)
```bash
# Install mermaid-cli
npm install -g @mermaid-js/mermaid-cli

# Convert to PNG
mmdc -i terraform/ARCHITECTURE.md -o architecture.png
```

---

## Need Help?

- **Mermaid Documentation**: https://mermaid.js.org/
- **draw.io Tutorials**: https://www.diagrams.net/doc/
- **AWS Architecture Icons**: https://aws.amazon.com/architecture/icons/
- **AWS Architecture Center**: https://aws.amazon.com/architecture/

---

## Files Included

- ✅ `ARCHITECTURE.md` - Mermaid diagrams (view on GitHub)
- ✅ `architecture-diagram.drawio` - Editable draw.io file
- ✅ `DIAGRAM-GUIDE.md` - This guide
