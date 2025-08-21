---
layout: post
author: pazalla
title:  "Dynamic Backgrounds in Godot 4"
categories: [ 2D, Visual Effects, Godot, Shader, Programming ]
image: assets/images/posts/2025-08-22.png
---

When I first developed this game years ago in **Cocos2d-JS 3**, I wanted to add a dynamic background to make the world feel alive. At the time, I had to settle for two large static images (1024x1024). They looked fine, but they were heavy in memory and ultimately felt flat and uninteresting.

The original concept and artistic direction for this background came from [@AtelierPolarite](https://x.com/AtelierPolarite), whose creative vision gave shape to the atmosphere I always imagined for this game. I want to thank Marta for her work and inspiration.

Now, while rebuilding the game in **Godot 4**, I finally implemented the dynamic background I originally envisioned. Instead of relying on a couple of oversized textures, I use a combination of **small reusable shapes**, a **shader**, and a **MultiMeshInstance2D** to create a lightweight background with natural motion.

This post walks you through the setup: the **scene structure**, the **shader** that animates the elements, and the **script** that distributes them across the screen.

![Static Background]({{site.baseurl}}/assets/images/posts/2025-08-22.gif)

# Step 1: Scene Setup

We’ll start by building the scene in Godot. The dynamic background is contained inside a `Control` node with a `ColorRect` (for the base color) and a `MultiMeshInstance2D` that will handle the repeated shapes.

```
DynamicBackground (dynamic_background.gd)
 ├── ColorRect
 └── MultiMeshInstance2D
       └── Texture: Triangle 120x224
           Multimesh
             - use_colors: TRUE
             - instance_count: 75
             - mesh: New QuadMesh (size: 120x224)
             - material: EMPTY  (shader not here!)
           Material
             - material: New ShaderMaterial
                 - shader: background_triangle_floating.gdshader
```

⚠️ Note: The shader must be applied at the **node material level**, not directly to the mesh. Otherwise, the vertex animation won’t propagate to the instances.

# Step 2: The Shader

The goal of the shader is to give each instance a floating effect. Using the red color channel as an offset, we can ensure every triangle moves in a slightly different rhythm.

**background\_triangle\_floating.gdshader**

```glsl
shader_type canvas_item;

uniform float amplitude = 10.0;
uniform float speed = 1.0;

void vertex() {
    float offset = COLOR.r;
    float t = TIME * speed + offset * 10.0;
    VERTEX.y += sin(t) * amplitude;
}
```

* **`amplitude`** controls how far each triangle floats vertically.
* **`speed`** controls how fast the animation runs.
* Each instance gets its offset from its assigned color, ensuring movement doesn’t look uniform or robotic.

# Step 3: The Script

The last piece is a script that distributes the shapes across the screen, assigns them random scales, rotations, and transparency, and applies the color palette defined in your game.

**dynamic\_background.gd**

```gdscript
class_name DynamicBackground
extends Control

@export var data: BackgroundData = null

@onready var color_rect: ColorRect = %ColorRect
@onready var multi_mesh_instance_2d: MultiMeshInstance2D = %MultiMeshInstance2D

var last_size := Vector2.ZERO
var rotation_values: Array[float] = [-PI/2, PI/2]
var multimesh: MultiMesh = null

func _ready():
    multimesh = multi_mesh_instance_2d.multimesh
    rebuild()
    get_viewport().size_changed.connect(rebuild)

func rebuild():
    if multimesh == null or get_viewport() == null:
        return

    color_rect.self_modulate = data.color
    var target_size = get_viewport().get_visible_rect().size

    for i in range(multimesh.instance_count):
        var xform := Transform2D()
        xform = xform.rotated(rotation_values.pick_random())
        xform = xform.scaled(Vector2.ONE * randf_range(1.0, 5.0))
        xform = xform.translated(Vector2(randi_range(0, target_size.x), randi_range(0, target_size.y)))
        multimesh.set_instance_transform_2d(i, xform)

        var random_color = data.colors.pick_random()
        random_color.a = randf_range(0.1, 0.5)
        multimesh.set_instance_color(i, random_color)
```

This script ensures:

* The background adapts to the viewport size.
* Each instance has a random position, rotation, and scale.
* Transparency varies, which adds depth.
* A predefined color palette (`BackgroundData`) controls the overall mood.

# Conclusion

With this setup, we replace heavy static textures with a **dynamic, lightweight background** that feels alive and adapts to different screen sizes. Thanks to `MultiMeshInstance2D`, Godot handles dozens of instances efficiently, while the shader adds motion at almost no extra cost.

This technique can be extended further—experiment with different shapes, more complex shaders, or even combine it with parallax layers for richer results.