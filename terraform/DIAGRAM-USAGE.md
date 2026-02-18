# AWS Architecture Diagram - Usage Guide

## File Created
✅ `aws-architecture-diagram.drawio`

## How to Open

### Option 1: Online (Recommended)
1. Go to https://app.diagrams.net/
2. Click **File → Open From → Device**
3. Select `aws-architecture-diagram.drawio`
4. The diagram will open with all AWS icons and transparent background

### Option 2: Desktop App
1. Download draw.io desktop: https://github.com/jgraph/drawio-desktop/releases
2. Install and open the application
3. **File → Open** → Select `aws-architecture-diagram.drawio`

### Option 3: VS Code
1. Install extension: "Draw.io Integration"
2. Open `aws-architecture-diagram.drawio` in VS Code
3. Edit directly in the editor

## Diagram Features

### ✅ Verified Components

1. **Terraform Logo** - Official Terraform icon from CDN
2. **AWS Cloud Container** - Official AWS Cloud group shape
3. **Users Icon** - AWS4 users icon (official)
4. **CloudFront** - AWS4 CloudFront resource icon (purple)
5. **IAM/OAC** - AWS4 Identity and Access Management icon (red)
6. **S3 Bucket** - AWS4 S3 resource icon (green)
7. **Policy** - AWS4 Policy icon (red)
8. **Region Container** - AWS4 region group shape

### 🎨 Design Elements

- **Transparent Background** ✓
- **Official AWS Colors** ✓
- **Proper Icon Sizing** (78x78px for resources)
- **Clear Labels** with descriptions
- **Numbered Flow** (1-5 showing request flow)
- **Legend** explaining symbols
- **Resource Count** box

### 📊 Architecture Flow

```
1. Users → CloudFront (HTTPS Request)
2. CloudFront → OAC (Cache Check)
3. OAC → S3 (SigV4 Signed Request)
4. S3 → Policy (Policy Validation)
5. S3 → OAC → CloudFront → Users (Return Content)
```

### 🎨 Color Coding

- **Orange (#FF9900)** - AWS Cloud, User requests
- **Purple (#8C4FFF)** - CloudFront
- **Red (#DD344C)** - IAM/OAC, Policies
- **Green (#7AA116)** - S3 Storage
- **Blue (#5C4EE5)** - Terraform
- **Teal (#00A4A6)** - Region, Return flow

## Export Options

### Export as PNG (High Quality)
1. **File → Export as → PNG**
2. Settings:
   - ✅ Transparent Background
   - Zoom: 100%
   - Border Width: 10
   - Resolution: 300 DPI (for print) or 150 DPI (for web)
3. Click **Export**

### Export as SVG (Vector)
1. **File → Export as → SVG**
2. Settings:
   - ✅ Transparent Background
   - ✅ Embed Images
   - ✅ Include a copy of my diagram
3. Click **Export**

### Export as PDF
1. **File → Export as → PDF**
2. Settings:
   - ✅ Transparent Background
   - ✅ Fit to 1 page
3. Click **Export**

## Customization

### Change Colors
1. Select any shape
2. Right panel → **Style** tab
3. Modify **Fill Color** or **Stroke Color**

### Add More Resources
1. Click **More Shapes** (bottom left)
2. Search: **AWS19** or **AWS Architecture 2021**
3. Enable the library
4. Drag and drop new icons

### Modify Text
1. Double-click any text element
2. Edit directly
3. Press **Escape** when done

### Adjust Layout
1. Select elements to move
2. Drag to new position
3. Use **Arrange → Align** for precise alignment

## Troubleshooting

### Icons Not Showing
- **Solution**: The diagram uses official AWS4 shapes built into draw.io
- If icons are missing, enable **AWS19** library:
  1. **More Shapes** → Search "AWS19"
  2. Check the box → **Apply**

### Terraform Logo Not Loading
- **Solution**: The Terraform logo loads from CDN
- If offline, replace with local image:
  1. Download: https://cdn.worldvectorlogo.com/logos/terraform-enterprise.svg
  2. **File → Import** → Select downloaded SVG

### Background Not Transparent
- **Solution**: When exporting:
  1. **File → Export as → PNG/SVG**
  2. ✅ Check "Transparent Background"
  3. Export again

## Diagram Dimensions

- **Canvas Size**: 1400 x 900 pixels
- **AWS Cloud Container**: 1160 x 820 pixels
- **Region Container**: 1080 x 440 pixels
- **Resource Icons**: 78 x 78 pixels
- **Grid**: 10px spacing

## Best Practices

✅ **Do:**
- Use official AWS icons from AWS19 library
- Maintain consistent icon sizes
- Use AWS brand colors
- Add clear labels and descriptions
- Export with transparent background

❌ **Don't:**
- Mix different icon styles
- Use low-resolution exports
- Forget to label components
- Overcrowd the diagram

## Quick Edits

### Update Bucket Name
1. Find "sudoku-app-f3c029a3" text
2. Double-click to edit
3. Replace with your actual bucket name

### Update Region
1. Find "Region: us-east-1" label
2. Double-click to edit
3. Change to your region

### Add More Files
1. Find S3 details box
2. Edit the file list
3. Add your additional files

## Sharing

### For Documentation
- Export as **PNG** (300 DPI, transparent)
- Include in README.md or wiki

### For Presentations
- Export as **SVG** (vector, scales perfectly)
- Import into PowerPoint/Keynote

### For Collaboration
- Share the `.drawio` file
- Others can edit with draw.io

## Resources

- **draw.io**: https://app.diagrams.net/
- **AWS Icons**: Built-in AWS19 library
- **Terraform Logo**: https://www.terraform.io/
- **AWS Architecture Icons**: https://aws.amazon.com/architecture/icons/

---

**Created**: 2026-02-17  
**Format**: draw.io XML  
**Background**: Transparent  
**Icons**: Official AWS4 + Terraform  
**Verified**: All components display correctly ✓
