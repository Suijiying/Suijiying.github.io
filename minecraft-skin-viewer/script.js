// ============================================================
// 1. THREE.MCBoxGeometry by Urushibara(pneuma01)
// ============================================================

THREE.MCBoxGeometry = function (width, height, depth, inflate, uvX, uvY, uvW, uvH, uvFlip, doubleFace, nocheck, beta) {
    THREE.Geometry.call(this);
    this.faceVertexUvs[0] = [];

    width = width ? width : 0;
    height = height ? height : 0;
    depth = depth ? depth : 0;
    inflate = inflate ? inflate : 0;
    uvX = uvX ? uvX : 0;
    uvY = uvY ? uvY : 0;

    let w = width,
        h = height,
        d = depth,
        x = width ? width + inflate : 0,
        y = height ? height + inflate : 0,
        z = depth ? depth + inflate : 0,
        tw = uvW ? uvW : w * 2 + d * 2,
        th = uvH ? uvH : d + h,
        p,
        color = {};

    let UVs = {
        right: [{ "x": uvX + d + w, "y": uvY + d }],
        left: [{ "x": uvX + 0, "y": uvY + d }],
        top: [{ "x": uvX + d, "y": uvY }],
        bottom: [{ "x": uvX + d + w, "y": uvY }],
        front: [{ "x": uvX + d, "y": uvY + d }],
        back: [{ "x": uvX + d + w + d, "y": uvY + d }],
    };
    pos = UVs.right[0];
    UVs.right[1] = { "x": (pos.x) / tw, "y": 1 - (pos.y + h) / th, flipOrder: 1 };
    UVs.right[2] = { "x": (pos.x + d) / tw, "y": 1 - (pos.y + h) / th, flipOrder: 2 };
    UVs.right[3] = { "x": (pos.x + d) / tw, "y": 1 - (pos.y) / th, flipOrder: 3 };
    UVs.right[0] = { "x": (pos.x) / tw, "y": 1 - (pos.y) / th, flipOrder: 0 };

    pos = UVs.left[0];
    UVs.left[1] = { "x": (pos.x + d) / tw, "y": 1 - (pos.y + h) / th, flipOrder: 1 };
    UVs.left[2] = { "x": (pos.x) / tw, "y": 1 - (pos.y + h) / th, flipOrder: 2 };
    UVs.left[3] = { "x": (pos.x) / tw, "y": 1 - (pos.y) / th, flipOrder: 3 };
    UVs.left[0] = { "x": (pos.x + d) / tw, "y": 1 - (pos.y) / th, flipOrder: 0 };

    pos = UVs.top[0];
    UVs.top[1] = { "x": (pos.x) / tw, "y": 1 - (pos.y) / th, flipOrder: 2 };
    UVs.top[2] = { "x": (pos.x + w) / tw, "y": 1 - (pos.y) / th, flipOrder: 1 };
    UVs.top[3] = { "x": (pos.x + w) / tw, "y": 1 - (pos.y + d) / th, flipOrder: 0 };
    UVs.top[0] = { "x": (pos.x) / tw, "y": 1 - (pos.y + d) / th, flipOrder: 3 };

    pos = UVs.bottom[0];
    if (beta) {
        UVs.bottom[1] = { "x": (pos.x) / tw, "y": 1 - (pos.y + d) / th, flipOrder: 2 };
        UVs.bottom[2] = { "x": (pos.x + w) / tw, "y": 1 - (pos.y + d) / th, flipOrder: 1 };
        UVs.bottom[3] = { "x": (pos.x + w) / tw, "y": 1 - (pos.y) / th, flipOrder: 0 };
        UVs.bottom[0] = { "x": (pos.x) / tw, "y": 1 - (pos.y) / th, flipOrder: 3 };
    } else {
        UVs.bottom[1] = { "x": (pos.x) / tw, "y": 1 - (pos.y) / th, flipOrder: 2 };
        UVs.bottom[2] = { "x": (pos.x + w) / tw, "y": 1 - (pos.y) / th, flipOrder: 1 };
        UVs.bottom[3] = { "x": (pos.x + w) / tw, "y": 1 - (pos.y + d) / th, flipOrder: 0 };
        UVs.bottom[0] = { "x": (pos.x) / tw, "y": 1 - (pos.y + d) / th, flipOrder: 3 };
    }

    pos = UVs.front[0];
    UVs.front[1] = { "x": (pos.x) / tw, "y": 1 - (pos.y + h) / th, flipOrder: 2 };
    UVs.front[2] = { "x": (pos.x + w) / tw, "y": 1 - (pos.y + h) / th, flipOrder: 1 };
    UVs.front[3] = { "x": (pos.x + w) / tw, "y": 1 - (pos.y) / th, flipOrder: 0 };
    UVs.front[0] = { "x": (pos.x) / tw, "y": 1 - (pos.y) / th, flipOrder: 3 };

    pos = UVs.back[0];
    UVs.back[1] = { "x": (pos.x + w) / tw, "y": 1 - (pos.y + h) / th, flipOrder: 2 };
    UVs.back[2] = { "x": (pos.x) / tw, "y": 1 - (pos.y + h) / th, flipOrder: 1 };
    UVs.back[3] = { "x": (pos.x) / tw, "y": 1 - (pos.y) / th, flipOrder: 0 };
    UVs.back[0] = { "x": (pos.x + w) / tw, "y": 1 - (pos.y) / th, flipOrder: 3 };

    if (uvFlip) {
        let sorter = (a, b) => { return a.flipOrder - b.flipOrder };
        UVs.right.sort(sorter);
        UVs.left.sort(sorter);
        UVs.top.sort(sorter);
        UVs.bottom.sort(sorter);
        UVs.front.sort(sorter);
        UVs.back.sort(sorter);
        let tmp = UVs.right;
        UVs.right = UVs.left;
        UVs.left = tmp;
    }

    if (height > 0 && depth > 0 || nocheck) {
        p = UVs.right;
        v = [
            this.vertices.push(new THREE.Vector3(x, 0, 0)) - 1,
            this.vertices.push(new THREE.Vector3(x, 0, z)) - 1,
            this.vertices.push(new THREE.Vector3(x, y, z)) - 1,
            this.vertices.push(new THREE.Vector3(x, y, 0)) - 1,
        ];
        this.faces.push(
            new THREE.Face3(v[1], v[0], v[2], THREE.vertexNormals, color, 0),
            new THREE.Face3(v[3], v[2], v[0], THREE.vertexNormals, color, 0)
        );
        this.faceVertexUvs[0].push(
            [new THREE.Vector2(p[1].x, p[1].y), new THREE.Vector2(p[2].x, p[2].y), new THREE.Vector2(p[0].x, p[0].y)],
            [new THREE.Vector2(p[3].x, p[3].y), new THREE.Vector2(p[0].x, p[0].y), new THREE.Vector2(p[2].x, p[2].y)],
        );
        if (doubleFace) {
            this.faces.push(
                new THREE.Face3(v[2], v[0], v[1], THREE.vertexNormals, color, 0),
                new THREE.Face3(v[0], v[2], v[3], THREE.vertexNormals, color, 0)
            );
            this.faceVertexUvs[0].push(
                [new THREE.Vector2(p[0].x, p[0].y), new THREE.Vector2(p[2].x, p[2].y), new THREE.Vector2(p[1].x, p[1].y)],
                [new THREE.Vector2(p[2].x, p[2].y), new THREE.Vector2(p[0].x, p[0].y), new THREE.Vector2(p[3].x, p[3].y)],
            );
        }

        if (width > 0 || nocheck) {
            p = UVs.left;
            v = [
                this.vertices.push(new THREE.Vector3(0, 0, 0)) - 1,
                this.vertices.push(new THREE.Vector3(0, 0, z)) - 1,
                this.vertices.push(new THREE.Vector3(0, y, z)) - 1,
                this.vertices.push(new THREE.Vector3(0, y, 0)) - 1,
            ];
            this.faces.push(
                new THREE.Face3(v[2], v[0], v[1], THREE.vertexNormals, color, 0),
                new THREE.Face3(v[0], v[2], v[3], THREE.vertexNormals, color, 0)
            );
            this.faceVertexUvs[0].push(
                [new THREE.Vector2(p[0].x, p[0].y), new THREE.Vector2(p[2].x, p[2].y), new THREE.Vector2(p[1].x, p[1].y)],
                [new THREE.Vector2(p[2].x, p[2].y), new THREE.Vector2(p[0].x, p[0].y), new THREE.Vector2(p[3].x, p[3].y)],
            );

            if (doubleFace) {
                this.faces.push(
                    new THREE.Face3(v[1], v[0], v[2], THREE.vertexNormals, color, 0),
                    new THREE.Face3(v[3], v[2], v[0], THREE.vertexNormals, color, 0)
                );
                this.faceVertexUvs[0].push(
                    [new THREE.Vector2(p[1].x, p[1].y), new THREE.Vector2(p[2].x, p[2].y), new THREE.Vector2(p[0].x, p[0].y)],
                    [new THREE.Vector2(p[3].x, p[3].y), new THREE.Vector2(p[0].x, p[0].y), new THREE.Vector2(p[2].x, p[2].y)],
                );
            }
        }
    }

    if (width > 0 && depth > 0 || nocheck) {
        p = UVs.top;
        v = [
            this.vertices.push(new THREE.Vector3(0, y, 0)) - 1,
            this.vertices.push(new THREE.Vector3(0, y, z)) - 1,
            this.vertices.push(new THREE.Vector3(x, y, z)) - 1,
            this.vertices.push(new THREE.Vector3(x, y, 0)) - 1,
        ];
        this.faces.push(
            new THREE.Face3(v[1], v[3], v[0], THREE.vertexNormals, color, 0),
            new THREE.Face3(v[3], v[1], v[2], THREE.vertexNormals, color, 0)
        );
        this.faceVertexUvs[0].push(
            [new THREE.Vector2(p[0].x, p[0].y), new THREE.Vector2(p[2].x, p[2].y), new THREE.Vector2(p[1].x, p[1].y)],
            [new THREE.Vector2(p[2].x, p[2].y), new THREE.Vector2(p[0].x, p[0].y), new THREE.Vector2(p[3].x, p[3].y)],
        );

        if (doubleFace) {
            this.faces.push(
                new THREE.Face3(v[0], v[3], v[1], THREE.vertexNormals, color, 0),
                new THREE.Face3(v[2], v[1], v[3], THREE.vertexNormals, color, 0)
            );
            this.faceVertexUvs[0].push(
                [new THREE.Vector2(p[1].x, p[1].y), new THREE.Vector2(p[2].x, p[2].y), new THREE.Vector2(p[0].x, p[0].y)],
                [new THREE.Vector2(p[3].x, p[3].y), new THREE.Vector2(p[0].x, p[0].y), new THREE.Vector2(p[2].x, p[2].y)],
            );
        }

        if (height > 0 || nocheck) {
            p = UVs.bottom;
            v = [
                this.vertices.push(new THREE.Vector3(0, 0, 0)) - 1,
                this.vertices.push(new THREE.Vector3(0, 0, z)) - 1,
                this.vertices.push(new THREE.Vector3(x, 0, z)) - 1,
                this.vertices.push(new THREE.Vector3(x, 0, 0)) - 1,
            ];
            this.faces.push(
                new THREE.Face3(v[0], v[3], v[1], THREE.vertexNormals, color, 0),
                new THREE.Face3(v[2], v[1], v[3], THREE.vertexNormals, color, 0)
            );
            this.faceVertexUvs[0].push(
                [new THREE.Vector2(p[1].x, p[1].y), new THREE.Vector2(p[2].x, p[2].y), new THREE.Vector2(p[0].x, p[0].y)],
                [new THREE.Vector2(p[3].x, p[3].y), new THREE.Vector2(p[0].x, p[0].y), new THREE.Vector2(p[2].x, p[2].y)],
            );

            if (doubleFace) {
                this.faces.push(
                    new THREE.Face3(v[1], v[3], v[0], THREE.vertexNormals, color, 0),
                    new THREE.Face3(v[3], v[1], v[2], THREE.vertexNormals, color, 0)
                );
                this.faceVertexUvs[0].push(
                    [new THREE.Vector2(p[0].x, p[0].y), new THREE.Vector2(p[2].x, p[2].y), new THREE.Vector2(p[1].x, p[1].y)],
                    [new THREE.Vector2(p[2].x, p[2].y), new THREE.Vector2(p[0].x, p[0].y), new THREE.Vector2(p[3].x, p[3].y)],
                );
            }
        }
    }

    if (width > 0 && height > 0 || nocheck) {
        p = UVs.front;
        v = [
            this.vertices.push(new THREE.Vector3(0, 0, z)) - 1,
            this.vertices.push(new THREE.Vector3(0, y, z)) - 1,
            this.vertices.push(new THREE.Vector3(x, y, z)) - 1,
            this.vertices.push(new THREE.Vector3(x, 0, z)) - 1,
        ];
        this.faces.push(
            new THREE.Face3(v[0], v[3], v[1], THREE.vertexNormals, color, 0),
            new THREE.Face3(v[2], v[1], v[3], THREE.vertexNormals, color, 0)
        );
        this.faceVertexUvs[0].push(
            [new THREE.Vector2(p[1].x, p[1].y), new THREE.Vector2(p[2].x, p[2].y), new THREE.Vector2(p[0].x, p[0].y)],
            [new THREE.Vector2(p[3].x, p[3].y), new THREE.Vector2(p[0].x, p[0].y), new THREE.Vector2(p[2].x, p[2].y)],
        );

        if (doubleFace) {
            this.faces.push(
                new THREE.Face3(v[1], v[3], v[0], THREE.vertexNormals, color, 0),
                new THREE.Face3(v[3], v[1], v[2], THREE.vertexNormals, color, 0)
            );
            this.faceVertexUvs[0].push(
                [new THREE.Vector2(p[0].x, p[0].y), new THREE.Vector2(p[2].x, p[2].y), new THREE.Vector2(p[1].x, p[1].y)],
                [new THREE.Vector2(p[2].x, p[2].y), new THREE.Vector2(p[0].x, p[0].y), new THREE.Vector2(p[3].x, p[3].y)],
            );
        }

        if (depth > 0 || nocheck) {
            p = UVs.back;
            v = [
                this.vertices.push(new THREE.Vector3(0, 0, 0)) - 1,
                this.vertices.push(new THREE.Vector3(0, y, 0)) - 1,
                this.vertices.push(new THREE.Vector3(x, y, 0)) - 1,
                this.vertices.push(new THREE.Vector3(x, 0, 0)) - 1,
            ];
            this.faces.push(
                new THREE.Face3(v[1], v[3], v[0], THREE.vertexNormals, color, 0),
                new THREE.Face3(v[3], v[1], v[2], THREE.vertexNormals, color, 0)
            );
            this.faceVertexUvs[0].push(
                [new THREE.Vector2(p[0].x, p[0].y), new THREE.Vector2(p[2].x, p[2].y), new THREE.Vector2(p[1].x, p[1].y)],
                [new THREE.Vector2(p[2].x, p[2].y), new THREE.Vector2(p[0].x, p[0].y), new THREE.Vector2(p[3].x, p[3].y)],
            );

            if (doubleFace) {
                this.faces.push(
                    new THREE.Face3(v[0], v[3], v[1], THREE.vertexNormals, color, 0),
                    new THREE.Face3(v[2], v[1], v[3], THREE.vertexNormals, color, 0)
                );
                this.faceVertexUvs[0].push(
                    [new THREE.Vector2(p[1].x, p[1].y), new THREE.Vector2(p[2].x, p[2].y), new THREE.Vector2(p[0].x, p[0].y)],
                    [new THREE.Vector2(p[3].x, p[3].y), new THREE.Vector2(p[0].x, p[0].y), new THREE.Vector2(p[2].x, p[2].y)],
                );
            }
        }
    }

    this.center();
    this.mergeVertices();
    this.computeFaceNormals();
};

THREE.MCBoxGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.MCBoxGeometry.prototype.constructor = THREE.MCBoxGeometry;


THREE.MCBoxGeometryUV = function (setting) {

    let width = setting.size[0],
        height = setting.size[1],
        depth = setting.size[2],
        uvW = setting.resolution.width,
        uvH = setting.resolution.height,
        faces = setting.faces;

    let rect2uvpos = pos => {
        let w = uvW,
            h = uvH;
        let min = [setting.tex_sizes[pos.idx].width, setting.tex_sizes[pos.idx].height].sort((a, b) => { return b - a })[0];
        if (w != 0 && w != min && h != 0 && h != min) {
            w = min;
            h = min;
        }

        if (pos.r - pos.l == 0 || pos.b - pos.t == 0) return undefined;

        let tw = setting.tex_sizes[pos.idx].width / w,
            th = setting.tex_sizes[pos.idx].height / h;

        return [
            { "x": (pos.l / w) / tw, "y": (1 - pos.t / h) / th },
            { "x": (pos.l / w) / tw, "y": (1 - pos.b / h) / th },
            { "x": (pos.r / w) / tw, "y": (1 - pos.b / h) / th },
            { "x": (pos.r / w) / tw, "y": (1 - pos.t / h) / th },
        ]
    }

    let rotation = (uvchild, angle) => {
        if (!uvchild) return undefined;
        switch (angle) {
            case 90:
                return [uvchild[1], uvchild[2], uvchild[3], uvchild[0]]
            case 180:
                return [uvchild[2], uvchild[3], uvchild[0], uvchild[1]]
            case 270:
                return [uvchild[3], uvchild[0], uvchild[1], uvchild[2]]
        }
        return uvchild
    }

    THREE.Geometry.call(this);
    this.faceVertexUvs[0] = [];

    let x = width,
        y = height,
        z = depth,
        p,
        color = {};

    let textureIndexes = [
        faces.east.texture !== undefined && faces.east.texture !== null ? faces.east.texture : 0,
        faces.west.texture !== undefined && faces.west.texture !== null ? faces.west.texture : 0,
        faces.up.texture !== undefined && faces.up.texture !== null ? faces.up.texture : 0,
        faces.down.texture !== undefined && faces.down.texture !== null ? faces.down.texture : 0,
        faces.south.texture !== undefined && faces.south.texture !== null ? faces.south.texture : 0,
        faces.north.texture !== undefined && faces.north.texture !== null ? faces.north.texture : 0,
    ];

    let UVs = {
        right: rect2uvpos({ "l": faces.east.uv[0], "t": faces.east.uv[1], "r": faces.east.uv[2], "b": faces.east.uv[3], idx: textureIndexes[0] }),
        left: rect2uvpos({ "l": faces.west.uv[0], "t": faces.west.uv[1], "r": faces.west.uv[2], "b": faces.west.uv[3], idx: textureIndexes[1] }),
        top: rect2uvpos({ "l": faces.up.uv[0], "t": faces.up.uv[1], "r": faces.up.uv[2], "b": faces.up.uv[3], idx: textureIndexes[2] }),
        bottom: rect2uvpos({ "l": faces.down.uv[0], "t": faces.down.uv[1], "r": faces.down.uv[2], "b": faces.down.uv[3], idx: textureIndexes[3] }),
        front: rect2uvpos({ "l": faces.south.uv[0], "t": faces.south.uv[1], "r": faces.south.uv[2], "b": faces.south.uv[3], idx: textureIndexes[4] }),
        back: rect2uvpos({ "l": faces.north.uv[0], "t": faces.north.uv[1], "r": faces.north.uv[2], "b": faces.north.uv[3], idx: textureIndexes[5] }),
    };
    if (faces.east.rotation) UVs.right = rotation(UVs.right, faces.east.rotation);
    if (faces.west.rotation) UVs.left = rotation(UVs.left, faces.west.rotation);
    if (faces.up.rotation) UVs.top = rotation(UVs.top, faces.up.rotation);
    if (faces.down.rotation) UVs.bottom = rotation(UVs.bottom, faces.down.rotation);
    if (faces.south.rotation) UVs.front = rotation(UVs.front, faces.south.rotation);
    if (faces.north.rotation) UVs.back = rotation(UVs.back, faces.north.rotation);

    this.culface = []

    if (UVs.front) {
        v = [
            this.vertices.push(new THREE.Vector3(0, 0, z)) - 1,
            this.vertices.push(new THREE.Vector3(0, y, z)) - 1,
            this.vertices.push(new THREE.Vector3(x, y, z)) - 1,
            this.vertices.push(new THREE.Vector3(x, 0, z)) - 1,
        ];
        this.faces.push(
            new THREE.Face3(v[0], v[3], v[1], THREE.vertexNormals, color, textureIndexes[4]),
            new THREE.Face3(v[2], v[1], v[3], THREE.vertexNormals, color, textureIndexes[4])
        );
        p = UVs.front;
        this.faceVertexUvs[0].push(
            [new THREE.Vector2(p[1].x, p[1].y), new THREE.Vector2(p[2].x, p[2].y), new THREE.Vector2(p[0].x, p[0].y)],
            [new THREE.Vector2(p[3].x, p[3].y), new THREE.Vector2(p[0].x, p[0].y), new THREE.Vector2(p[2].x, p[2].y)],
        );
        this.culface.push(4)
    }

    if (UVs.right) {
        v = [
            this.vertices.push(new THREE.Vector3(x, 0, 0)) - 1,
            this.vertices.push(new THREE.Vector3(x, 0, z)) - 1,
            this.vertices.push(new THREE.Vector3(x, y, z)) - 1,
            this.vertices.push(new THREE.Vector3(x, y, 0)) - 1,
        ];
        this.faces.push(
            new THREE.Face3(v[1], v[0], v[2], THREE.vertexNormals, color, textureIndexes[0]),
            new THREE.Face3(v[3], v[2], v[0], THREE.vertexNormals, color, textureIndexes[0])
        );
        p = UVs.right;
        this.faceVertexUvs[0].push(
            [new THREE.Vector2(p[1].x, p[1].y), new THREE.Vector2(p[2].x, p[2].y), new THREE.Vector2(p[0].x, p[0].y)],
            [new THREE.Vector2(p[3].x, p[3].y), new THREE.Vector2(p[0].x, p[0].y), new THREE.Vector2(p[2].x, p[2].y)],
        );
        this.culface.push(0)
    }

    if (UVs.left) {
        v = [
            this.vertices.push(new THREE.Vector3(0, 0, 0)) - 1,
            this.vertices.push(new THREE.Vector3(0, 0, z)) - 1,
            this.vertices.push(new THREE.Vector3(0, y, z)) - 1,
            this.vertices.push(new THREE.Vector3(0, y, 0)) - 1,
        ];
        this.faces.push(
            new THREE.Face3(v[2], v[0], v[1], THREE.vertexNormals, color, textureIndexes[1]),
            new THREE.Face3(v[0], v[2], v[3], THREE.vertexNormals, color, textureIndexes[1])
        );
        p = UVs.left;
        this.faceVertexUvs[0].push(
            [new THREE.Vector2(p[3].x, p[3].y), new THREE.Vector2(p[1].x, p[1].y), new THREE.Vector2(p[2].x, p[2].y)],
            [new THREE.Vector2(p[1].x, p[1].y), new THREE.Vector2(p[3].x, p[3].y), new THREE.Vector2(p[0].x, p[0].y)],
        );
        this.culface.push(1)
    }

    if (UVs.top) {
        v = [
            this.vertices.push(new THREE.Vector3(0, y, 0)) - 1,
            this.vertices.push(new THREE.Vector3(0, y, z)) - 1,
            this.vertices.push(new THREE.Vector3(x, y, z)) - 1,
            this.vertices.push(new THREE.Vector3(x, y, 0)) - 1,
        ];
        this.faces.push(
            new THREE.Face3(v[1], v[3], v[0], THREE.vertexNormals, color, textureIndexes[2]),
            new THREE.Face3(v[3], v[1], v[2], THREE.vertexNormals, color, textureIndexes[2])
        );
        p = UVs.top;
        this.faceVertexUvs[0].push(
            [new THREE.Vector2(p[1].x, p[1].y), new THREE.Vector2(p[3].x, p[3].y), new THREE.Vector2(p[0].x, p[0].y)],
            [new THREE.Vector2(p[3].x, p[3].y), new THREE.Vector2(p[1].x, p[1].y), new THREE.Vector2(p[2].x, p[2].y)],
        );
        this.culface.push(2)
    }

    if (UVs.bottom) {
        v = [
            this.vertices.push(new THREE.Vector3(0, 0, 0)) - 1,
            this.vertices.push(new THREE.Vector3(0, 0, z)) - 1,
            this.vertices.push(new THREE.Vector3(x, 0, z)) - 1,
            this.vertices.push(new THREE.Vector3(x, 0, 0)) - 1,
        ];
        this.faces.push(
            new THREE.Face3(v[0], v[3], v[1], THREE.vertexNormals, color, textureIndexes[3]),
            new THREE.Face3(v[2], v[1], v[3], THREE.vertexNormals, color, textureIndexes[3])
        );
        p = UVs.bottom;
        this.faceVertexUvs[0].push(
            [new THREE.Vector2(p[1].x, p[1].y), new THREE.Vector2(p[2].x, p[2].y), new THREE.Vector2(p[0].x, p[0].y)],
            [new THREE.Vector2(p[3].x, p[3].y), new THREE.Vector2(p[0].x, p[0].y), new THREE.Vector2(p[2].x, p[2].y)],
        );
        this.culface.push(3)
    }

    if (UVs.back) {
        v = [
            this.vertices.push(new THREE.Vector3(0, 0, 0)) - 1,
            this.vertices.push(new THREE.Vector3(0, y, 0)) - 1,
            this.vertices.push(new THREE.Vector3(x, y, 0)) - 1,
            this.vertices.push(new THREE.Vector3(x, 0, 0)) - 1,
        ];
        this.faces.push(
            new THREE.Face3(v[1], v[3], v[0], THREE.vertexNormals, color, textureIndexes[5]),
            new THREE.Face3(v[3], v[1], v[2], THREE.vertexNormals, color, textureIndexes[5])
        );
        p = UVs.back;
        this.faceVertexUvs[0].push(
            [new THREE.Vector2(p[3].x, p[3].y), new THREE.Vector2(p[1].x, p[1].y), new THREE.Vector2(p[2].x, p[2].y)],
            [new THREE.Vector2(p[1].x, p[1].y), new THREE.Vector2(p[3].x, p[3].y), new THREE.Vector2(p[0].x, p[0].y)],
        );
        this.culface.push(5)
    }

    this.translate(-x / 2, -y / 2, -z / 2);
    this.mergeVertices();
    this.computeFaceNormals();
};

THREE.MCBoxGeometryUV.prototype = Object.create(THREE.Geometry.prototype);
THREE.MCBoxGeometryUV.prototype.constructor = THREE.MCBoxGeometryUV;


let getMinMax = (uvs, x) => {
    let ret = { min: 1, max: 0 }
    uvs.forEach(uv => {
        ret.min = Math.min(ret.min, x ? uv.x : uv.y)
        ret.max = Math.max(ret.max, x ? uv.x : uv.y)
    })
    return ret
}

THREE.MCBoxGeometryUV.prototype.UVFlipHolizontal = function (faceidx) {
    faceidx *= 2
    let mx = getMinMax(this.faceVertexUvs[0][faceidx], 1)
    this.faceVertexUvs[0][faceidx + 0].forEach(uv => { uv.x = uv.x == mx.min ? mx.max : mx.min })
    this.faceVertexUvs[0][faceidx + 1].forEach(uv => { uv.x = uv.x == mx.min ? mx.max : mx.min })
    this.uvsNeedUpdate = true
}

THREE.MCBoxGeometryUV.prototype.UVFlipVertical = function (faceidx) {
    faceidx *= 2
    let mx = getMinMax(this.faceVertexUvs[0][faceidx])
    this.faceVertexUvs[0][faceidx + 0].forEach(uv => { uv.y = uv.y == mx.min ? mx.max : mx.min })
    this.faceVertexUvs[0][faceidx + 1].forEach(uv => { uv.y = uv.y == mx.min ? mx.max : mx.min })
    this.uvsNeedUpdate = true
}

THREE.MCBoxGeometryUV.prototype.UVRotate = function (faceidx, orientation) {
    faceidx *= 2
    let angle = Math.floor(((360 + orientation) % 360) / 90)
    if (angle == 0) return
    let convert = [{}, {
        "0": 2,
        "1": 0,
        "2": 3,
        "3": 1
    }, {
        "0": 3,
        "1": 2,
        "2": 1,
        "3": 0
    }, {
        "0": 1,
        "1": 3,
        "2": 0,
        "3": 2
    }, ]

    let set = (uv, mx, my) => {
        let c = convert[angle][((uv.x == mx.max ? 1 : 0) << 1) | (uv.y == my.max ? 1 : 0)]
        uv.x = c >> 1 ? mx.max : mx.min
        uv.y = c & 1 ? my.max : my.min
    }

    let mx = getMinMax(this.faceVertexUvs[0][faceidx], true)
    let my = getMinMax(this.faceVertexUvs[0][faceidx])
    this.faceVertexUvs[0][faceidx + 0].forEach(uv => set(uv, mx, my))
    this.faceVertexUvs[0][faceidx + 1].forEach(uv => set(uv, mx, my))
    this.uvsNeedUpdate = true
}


// ============================================================
// 2. BBModelLoader
// ============================================================

BBModelLoader = function (setting) {
    this.setting = setting;
    this.filename = setting.filename;
    this.file = setting.file;
    this.only_visible = setting.only_visible;
    this.side = setting.side ? setting.side : THREE.FrontSide;
    this.sides = setting.sides;
    this.doubleFace = setting.doubleFace;
    this.useAlpha = setting.useAlpha;
    this.depthWrite = setting.depthWrite != undefined ? setting.depthWrite : true;
    this.depthTest = setting.depthTest != undefined ? setting.depthTest : true;
    this.depthcheck = setting.depthcheck != undefined ? setting.depthcheck : false;
    this.texture_name = setting.texture_name;
    this.texture_src = setting.texture_src;
    this.shadow = setting.shadow != undefined ? setting.shadow : true;
    this.onload = setting.onload;
    this.receiveShadow = setting.receiveShadow != undefined ? setting.receiveShadow : false;
    this.opacity = setting.opacity != undefined ? setting.opacity : 1.0;
    this.opacities = setting.opacities;
    this.materialType = setting.materialType != undefined ? setting.materialType : 0;
    this.isBetaModel = setting.isBetaModel;
    this.diagonalStretch = setting.diagonalStretch != undefined ? setting.diagonalStretch : false;
    this.defaultOrigin = setting.defaultOrigin != undefined ? setting.defaultOrigin : false;
    this.parts = {};
    this.object = null;
};

BBModelLoader.alphaNone = 0;
BBModelLoader.alphaByAlpha = 1;
BBModelLoader.alphaByColor = 2;
BBModelLoader.alphaByGamma = 3;
BBModelLoader.alphaByWhite = 4;
BBModelLoader.alphaByAlpha2 = 5;
BBModelLoader.alphaByZero = 6;

BBModelLoader.materialDefault = 0;
BBModelLoader.materialBasic = 1;

BBModelLoader.prototype.loadEntity = function (onload) {
    if (onload) {
        this.onload = onload;
    }
    this.meshes = [];
    this.materials = [];

    let load = async (data) => {
        if (data.meta && data.meta.format == "1.0" && data["cubes"] && data["outliner"]) {
            this.object = new THREE.Object3D();
            this.object.name = data.name;
            this.resolution = data.resolution ? data.resolution : { width: 64, height: 32 };

            let used_child = [];
            let texture;

            if (!this.useAlpha) {
                let img_elem = document.querySelector(this.texture_name[0])
                if (img_elem.tagName == "IMG") {
                    let loader = new THREE.TextureLoader()
                    texture = loader.load(img_elem.src)
                } else {
                    texture = new THREE.CanvasTexture(img_elem);
                }
                texture.magFilter = THREE.NearestFilter;
                texture.minFilter = THREE.NearestFilter;
                texture.type = THREE.FloatType;
                texture.wrapS = THREE.ClampToEdgeWrapping;
                texture.wrapT = THREE.ClampToEdgeWrapping;
                if (img_elem.name && texture.image) {
                    texture.image.name = img_elem.name
                }
            }
            if (this.useAlpha) {
                let img_elem = document.querySelector(this.texture_name[0])
                texture = await removeAlpha(img_elem);
                if (img_elem.name && texture.image) {
                    texture.image.name = img_elem.name + "_alpha"
                }
                this.alphaMap = await createAlphaMap(document.querySelector(this.texture_name[0]), this.opacity, this.useAlpha);
            }
            let setting = { map: texture, side: this.side };
            setting.depthWrite = this.depthWrite ? this.depthWrite : false;
            setting.depthTest = this.depthTest != undefined ? this.depthTest : true;
            if (this.useAlpha) {
                setting.transparent = true;
                setting.alphaMap = this.alphaMap;
            } else {
                setting.transparent = false;
                setting.alphaTest = 0.0001;
                setting.opacity = this.opacity;
            }
            this.materials[0] = this.materialType ? new THREE.MeshBasicMaterial(setting) : new THREE.MeshLambertMaterial(setting)

            data.outliner.forEach(outline => {
                if (!this.only_visible || outline.visibility != false) {
                    let outliner = new THREE.Object3D();
                    outliner.name = outline.name;
                    outliner.userData.uuid = outline.uuid;
                    let origin = [
                        (outline.origin ? outline.origin[0] : 0),
                        (outline.origin ? outline.origin[1] : 0),
                        (outline.origin ? outline.origin[2] : 0),
                    ];
                    data.cubes.forEach(element => {
                        if (outline.children.indexOf(element.uuid) > -1 && (!this.only_visible || element.visibility != false)) {
                            let size = [
                                Math.abs(element.from[0] - element.to[0]),
                                Math.abs(element.from[1] - element.to[1]),
                                Math.abs(element.from[2] - element.to[2])
                            ];
                            let uv_offset = [
                                element.uv_offset ? element.uv_offset[0] : 0,
                                element.uv_offset ? element.uv_offset[1] : 0
                            ];
                            let flip = false || element.shade == false;
                            let inflate = (element.inflate ? element.inflate : 0);

                            let mesh = new THREE.Mesh(
                                new THREE.MCBoxGeometry(size[0], size[1], size[2], inflate, uv_offset[0], uv_offset[1], data.resolution.width, data.resolution.height, flip, this.doubleFace, !this.depthcheck, this.isBetaModel),
                                this.materials
                            );

                            mesh.receiveShadow = this.receiveShadow;
                            mesh.castShadow = this.receiveShadow;
                            mesh.geometry.translate(origin[0], origin[1], origin[2]);
                            mesh.name = element.name;

                            this.meshes.push(mesh);

                            let cube = new THREE.Object3D();
                            cube.add(mesh);
                            cube.visible = element.visibility != false;
                            cube.name = element.name;
                            cube.userData.uuid = element.uuid;
                            cube.userData.parent = outliner.userData.uuid;
                            let center = [
                                element.from[0] + size[0] / 2,
                                element.from[1] + size[1] / 2,
                                element.from[2] + size[2] / 2
                            ];
                            let pos = [
                                center[0] - origin[0],
                                center[1] - origin[1],
                                center[2] - origin[2]
                            ];
                            cube.position.set(-pos[0], pos[1], -pos[2]);
                            outliner.add(cube);

                            used_child.push(element.uuid);
                        }
                    });
                    if (outline["rotation"]) {
                        let axis = new THREE.Vector3(1, 0, 0);
                        outliner.rotateOnWorldAxis(axis, deg2rad(-outline.rotation[0]));
                        axis.set(0, 1, 0);
                        outliner.rotateOnWorldAxis(axis, deg2rad(outline.rotation[1]));
                        axis.set(0, 0, 1);
                        outliner.rotateOnWorldAxis(axis, deg2rad(-outline.rotation[2]));
                    }
                    this.parts[outliner.name] = outliner;
                    this.object.add(outliner);
                }
            });
        }
        if (data.meta && data.meta.format_version >= 3 && data["elements"] && data["outliner"]) {
            this.object = new THREE.Object3D();
            this.object.name = data.name;
            this.resolution = data.resolution ? data.resolution : { width: 64, height: 32 };

            this.zrotflip = (data.meta.format_version > 3.1);

            let cubes = [];
            let texture;

            if (this.texture_src) {
                let loader = new THREE.TextureLoader();
                texture = loader.load(this.texture_src)
            } else {
                let img_elem = document.querySelector(this.texture_name[0])
                if (img_elem.tagName == "IMG") {
                    let loader = new THREE.TextureLoader()
                    texture = loader.load(img_elem.src)
                } else {
                    texture = new THREE.CanvasTexture(img_elem);
                }
                if (img_elem.name && texture.image) {
                    texture.image.name = img_elem.name
                }
            }
            texture.magFilter = THREE.NearestFilter;
            texture.minFilter = THREE.NearestFilter;
            texture.type = THREE.FloatType;
            texture.wrapS = THREE.ClampToEdgeWrapping;
            texture.wrapT = THREE.ClampToEdgeWrapping;

            let alphaMap = null;
            if (this.useAlpha) {
                let img_elem = document.querySelector(this.texture_name[0])
                if (img_elem.name && texture.image) {
                    texture.image.name = img_elem.name + "_alpha"
                }
                alphaMap = await createAlphaMap(img_elem, this.opacity, this.useAlpha);
            }

            let setting = { map: texture, side: this.side };
            setting.depthWrite = this.depthWrite != undefined ? this.depthWrite : false;
            setting.depthTest = this.depthTest != undefined ? this.depthTest : true;
            if (this.useAlpha) {
                setting.transparent = true;
                setting.alphaMap = alphaMap;
            } else {
                setting.transparent = false;
                setting.alphaTest = 0.0001;
                setting.opacity = this.opacity;
            }
            this.materials[0] = this.materialType ? new THREE.MeshBasicMaterial(setting) : new THREE.MeshLambertMaterial(setting)
            this.materials[0].name = data.name + "_mtl"

            data.elements.forEach(element => {
                if ((!this.only_visible || element.visibility != false) && element.type != "locator") {

                    let size = [
                        Math.abs(element.from[0] - element.to[0]),
                        Math.abs(element.from[1] - element.to[1]),
                        Math.abs(element.from[2] - element.to[2])
                    ];
                    let uv_offset = [
                        element.uv_offset ? element.uv_offset[0] : 0,
                        element.uv_offset ? element.uv_offset[1] : 0
                    ];
                    let flip = false || element.shade == false;
                    let inflate = (element.inflate ? element.inflate : 0);

                    let mesh;
                    if (element.box_uv == false) {
                        let tex_sizes = [{ width: this.resolution.width, height: this.resolution.width }];
                        mesh = new THREE.Mesh(
                            new THREE.MCBoxGeometryUV({ size: size, resolution: this.resolution, faces: element.faces, tex_sizes: tex_sizes }),
                            this.materials
                        );
                        let scale = 1 + inflate / 2;
                        mesh.scale.set(scale, scale, scale);
                    } else {
                        mesh = new THREE.Mesh(
                            new THREE.MCBoxGeometry(size[0], size[1], size[2], inflate, uv_offset[0], uv_offset[1], data.resolution.width, data.resolution.height, flip, this.doubleFace, !this.depthcheck, this.isBetaModel),
                            this.materials
                        );
                    }
                    mesh.receiveShadow = this.receiveShadow;
                    mesh.castShadow = this.receiveShadow;

                    let center = [
                        element.from[0] + size[0] / 2,
                        element.from[1] + size[1] / 2,
                        element.from[2] + size[2] / 2
                    ];
                    let origin = [
                        (element.origin ? element.origin[0] : center[0]),
                        (element.origin ? element.origin[1] : center[1]),
                        (element.origin ? element.origin[2] : center[2]),
                    ];
                    let pos = [
                        center[0] - origin[0],
                        center[1] - origin[1],
                        center[2] - origin[2],
                    ];

                    mesh.position.set(-pos[0], pos[1], -pos[2]);
                    mesh.name = element.name;
                    this.meshes.push(mesh);

                    let cube = new THREE.Object3D();
                    cube.userData.origin = origin;
                    cube.add(mesh);
                    cube.visible = element.visibility != false;
                    cube.name = element.name;
                    cube.userData.uuid = element.uuid;
                    cube.userData.children = [];
                    cube.userData.center = origin;
                    cube.position.set(-pos[0], pos[1], -pos[2]);
                    if (element["rotation"]) {
                        let axis = new THREE.Vector3(1, 0, 0);
                        cube.rotateOnWorldAxis(axis, deg2rad(-element.rotation[0]));
                        axis.set(0, 1, 0);
                        cube.rotateOnWorldAxis(axis, deg2rad(element.rotation[1]));
                        axis.set(0, 0, 1);
                        cube.rotateOnWorldAxis(axis, deg2rad(-element.rotation[2] * (this.zrotflip ? -1 : 1)));
                    }
                    cubes.push(cube);
                }
            });

            data.outliner.forEach(outline => {
                appendChild.call(this, outline, this.object);

                function appendChild(json, owner) {
                    if (!this.only_visible || outline.visibility != false) {
                        let outliner = new THREE.Object3D();
                        outliner.name = json.name;
                        outliner.userData.uuid = json.uuid;

                        let origin = [
                            (json.origin ? json.origin[0] : 0),
                            (json.origin ? json.origin[1] : 0),
                            (json.origin ? json.origin[2] : 0),
                        ];
                        outliner.userData.origin = origin;
                        if (json["rotation"]) {
                            let axis = new THREE.Vector3(1, 0, 0);
                            outliner.rotateOnWorldAxis(axis, deg2rad(-json.rotation[0]));
                            axis.set(0, 1, 0);
                            outliner.rotateOnWorldAxis(axis, deg2rad(json.rotation[1]));
                            axis.set(0, 0, 1);
                            outliner.rotateOnWorldAxis(axis, deg2rad(json.rotation[2] * (this.zrotflip ? -1 : 1)));
                        }
                        let pos = origin;
                        if (owner && owner.userData.origin) {
                            pos = [
                                origin[0] - owner.userData.origin[0],
                                origin[1] - owner.userData.origin[1],
                                origin[2] - owner.userData.origin[2]
                            ];
                        }
                        outliner.position.set(-pos[0], pos[1], -pos[2]);
                        outliner.userData.center = pos;
                        this.parts[outliner.name] = outliner;
                        owner.add(outliner);

                        if (json.children) {
                            json.children.forEach(child => {
                                if (typeof child === "string") {
                                    let child_uuid = child;
                                    cubes.forEach(cube => {
                                        if (cube.userData.uuid == child_uuid) {
                                            let pos = [
                                                cube.userData.center[0] - outliner.userData.origin[0],
                                                cube.userData.center[1] - outliner.userData.origin[1],
                                                cube.userData.center[2] - outliner.userData.origin[2]
                                            ];
                                            cube.position.set(-pos[0], pos[1], -pos[2]);
                                            cube.userData.parent = outliner.userData.uuid;
                                            outliner.add(cube);
                                        }
                                    });
                                } else {
                                    appendChild.call(this, child, outliner);
                                }
                            });
                        }
                    }
                }
            });
        }
        if (typeof this.onload === "function") {
            this.onload.call(this, this.object, this.parts);
        }
    }

    if (typeof this.filename == "string") {
        let self = this;
        $.getJSON(this.filename, function (data) {
            load.call(self, data)
        });
    } else if (this.file instanceof Blob) {
        let self = this;
        let reader = new FileReader();
        reader.onload = function () {
            load.call(self, JSON.parse(this.result));
        }
        reader.readAsText(this.file);
    }

    return this;
}

BBModelLoader.prototype.loadBlock = function (onload) {
    if (onload) {
        this.onload = onload;
    }

    if (this.shadow == undefined || this.shadow == true) {
        this.shadow = []
        for (let i = 0; i < this.texture_name.length; i++) {
            this.shadow.push(true)
        }
    }

    let load = async function (data) {

        if (this.texture_name.length < this.tex_length) throw "not enough textures.";

        if (data.meta && data.meta.format_version >= 3 && data.meta.model_format == "java_block" && data["elements"] && data["outliner"]) {

            this.tex_length = data.textures.length
            this.format = data.meta.model_format
            this.textures = data.textures
            this.userData = {}

            this.object = new THREE.Object3D();
            this.object.name = data.name;
            this.object.userData.origin = [8, 8, 8];

            this.resolution = data.resolution ? data.resolution : { width: 16, height: 16 };
            tex_sizes = [];

            this.materials = [];

            if (this.texture_name.length < this.tex_length) {
                console.log("Not enough image")
                return undefined;
            }

            for (let i = 0; i < this.tex_length; i++) {
                let texture
                let setting = { transparent: false, side: this.sides ? this.sides[i] : this.side, name: data.textures[i].id };
                if (this.useAlpha && (this.useAlpha[i] || this.useAlpha > 0)) {
                    let img = document.querySelector(this.texture_name[i]);

                    if (img) {
                        tex_sizes.push({ width: this.resolution.width, height: (img.height / img.width) * this.resolution.width });
                        setting.map = await removeAlpha(img);
                        setting.transparent = true;
                        setting.depthWrite = this.depthWrite ? this.depthWrite : false;
                        setting.depthTest = this.depthTest != undefined ? this.depthTest : true;
                        setting.premultipliedAlpha = true;
                        setting.alphaMap = await createAlphaMap(img, this.opacities ? this.opacities[i] : this.opacity, this.useAlpha.length ? this.useAlpha[i] : this.useAlpha);
                    } else if (this.texture_name[i] == 'self' && data.textures[i] && data.textures[i].source) {
                        img = await imageReLoader(new Image(), data.textures[i].source)
                        setting.map = await removeAlpha(img);
                        setting.transparent = true;
                        setting.depthWrite = this.depthWrite ? this.depthWrite : false;
                        setting.depthTest = this.depthTest != undefined ? this.depthTest : true;
                        setting.premultipliedAlpha = true;
                        setting.alphaMap = await createAlphaMap(img, this.opacities ? this.opacities[i] : this.opacity, this.useAlpha.length ? this.useAlpha[i] : this.useAlpha);

                        if (data.textures[i].name) {
                            setting.map.image.name = data.textures[i].name
                        }
                        tex_sizes.push({ width: this.resolution.width, height: (img.height / img.width) * this.resolution.width });
                    } else {
                        tex_sizes.push({ width: 16, height: 16 });
                    }
                } else {
                    let img = document.querySelector(this.texture_name[i]);

                    if (img) {
                        if (img.tagName == "IMG") {
                            let loader = new THREE.TextureLoader()
                            texture = loader.load(img.src)
                            tex_sizes.push({ width: this.resolution.width, height: (img.height / img.width) * this.resolution.width });
                        } else {
                            texture = await removeAlpha2(img)
                            tex_sizes.push({ width: this.resolution.width, height: (img.height / img.width) * this.resolution.width });
                        }
                        texture.magFilter = THREE.NearestFilter;
                        texture.minFilter = THREE.NearestFilter;
                        texture.type = THREE.FloatType;
                        if (img.name) {
                            texture.image.name = img.name
                        }

                        setting.map = texture;
                    } else if (this.texture_name[i] == 'data' && data.textures[i] && data.textures[i].source) {
                        let loader = new THREE.TextureLoader()
                        texture = loader.load(data.textures[i].source)
                        tex_sizes.push({ width: data.textures[i].width, height: data.textures[i].height });
                        texture.magFilter = THREE.NearestFilter;
                        texture.minFilter = THREE.NearestFilter;
                        texture.type = THREE.FloatType;
                        setting.map = texture;
                    } else {
                        tex_sizes.push({ width: 16, height: 16 });
                    }
                    setting.transparent = false;
                    setting.alphaTest = 0.5;
                }
                this.materials.push(
                    this.shadow[i] ? new THREE.MeshLambertMaterial(setting) : new THREE.MeshBasicMaterial(setting)
                );
            }

            this.elements = data.elements;
            let cubes = [];
            this.meshes = [];
            data.elements.forEach(element => {
                if (!this.only_visible || element.visibility != false) {

                    let origin = [
                        (element.origin ? element.origin[0] : 0),
                        (element.origin ? element.origin[1] : 0),
                        (element.origin ? element.origin[2] : 0),
                    ];

                    let size = [
                        Math.abs(element.from[0] - element.to[0]),
                        Math.abs(element.from[1] - element.to[1]),
                        Math.abs(element.from[2] - element.to[2])
                    ];

                    let isPlane = false;
                    {
                        size.forEach(axis => {
                            if (axis == 0) {
                                isPlane = true
                            }
                        });
                    }

                    let mesh = new THREE.Mesh(
                        new THREE.MCBoxGeometryUV({ size: size, resolution: this.resolution, faces: element.faces, tex_sizes: tex_sizes }),
                        this.materials
                    );
                    mesh.userData.faces = element.faces;
                    mesh.userData.size = size;
                    mesh.name = element.name
                    this.meshes.push(mesh);

                    let cube = new THREE.Object3D();
                    cube.add(mesh);
                    cube.visible = element.visibility != false;
                    cube.name = element.name;
                    cube.userData.uuid = element.uuid;
                    cube.userData.origin = origin;

                    let center = [
                        element.from[0] + size[0] / 2,
                        element.from[1] + size[1] / 2,
                        element.from[2] + size[2] / 2
                    ];

                    cube.userData.center = center;

                    let pos = [
                        center[0] - origin[0],
                        center[1] - origin[1],
                        center[2] - origin[2]
                    ];

                    mesh.position.set(pos[0], pos[1], pos[2]);
                    if (element["inflate"]) {
                        mesh.scale.set(1 + element.inflate, 1 + element.inflate, 1 + element.inflate)
                    }

                    if (element["rotation"]) {
                        let axis = new THREE.Vector3(1, 0, 0);
                        cube.rotateOnWorldAxis(axis, deg2rad(element.rotation[0]));
                        axis.set(0, 1, 0);
                        cube.rotateOnWorldAxis(axis, deg2rad(element.rotation[1]));
                        axis.set(0, 0, 1);
                        cube.rotateOnWorldAxis(axis, deg2rad(element.rotation[2]));

                        if (isPlane && (this.diagonalStretch || element.rescale)) {
                            let scale = 1 / Math.cos(deg2rad(element.rotation[0]));

                            if (size[1] == 0) {
                                mesh.scale.z = mesh.scale.z * scale;
                            } else if (size[2] == 0) {
                                mesh.scale.y = mesh.scale.y * scale;
                            }

                            scale = 1 / Math.cos(deg2rad(element.rotation[1]));
                            if (size[0] == 0) {
                                mesh.scale.z = mesh.scale.z * scale;
                            } else if (size[2] == 0) {
                                mesh.scale.x = mesh.scale.x * scale;
                            }

                            scale = 1 / Math.cos(deg2rad(element.rotation[2]));
                            if (size[0] == 0) {
                                mesh.scale.y = mesh.scale.y * scale;
                            } else if (size[1] == 0) {
                                mesh.scale.x = mesh.scale.x * scale;
                            }
                        }

                        cube.userData.rotation = element.rotation;
                    }

                    this.parts[cube.name] = cube;
                    cubes.push(cube);
                    this.object.add(cube);
                }
            });


            function appendChild(json, owner) {
                if (!this.only_visible || outline.visibility != false) {
                    let outliner = new THREE.Object3D();
                    outliner.name = json.name;
                    outliner.userData.uuid = json.uuid;

                    let origin = [
                        (json.origin ? json.origin[0] : 0),
                        (json.origin ? json.origin[1] : 0),
                        (json.origin ? json.origin[2] : 0),
                    ];
                    outliner.userData.origin = origin;
                    if (json["rotation"]) {
                        let axis = new THREE.Vector3(1, 0, 0);
                        outliner.rotateOnWorldAxis(axis, deg2rad(json.rotation[0]));
                        axis.set(0, 1, 0);
                        outliner.rotateOnWorldAxis(axis, deg2rad(json.rotation[1]));
                        axis.set(0, 0, 1);
                        outliner.rotateOnWorldAxis(axis, deg2rad(json.rotation[2]));
                    }
                    let pos = origin;
                    if (owner && owner.userData.origin) {
                        pos = [
                            origin[0] - owner.userData.origin[0],
                            origin[1] - owner.userData.origin[1],
                            origin[2] - owner.userData.origin[2]
                        ];
                    }

                    outliner.position.set(pos[0], pos[1], pos[2]);
                    outliner.userData.center = pos;
                    this.parts[outliner.name] = outliner;
                    owner.add(outliner);

                    if (!json.children) return;

                    json.children.forEach(child => {
                        if (typeof child === "string") {
                            let child_uuid = child;
                            cubes.forEach(cube => {
                                if (cube.userData.uuid == child_uuid) {
                                    cube.position.set(
                                        cube.userData.origin[0] - owner.userData.origin[0],
                                        cube.userData.origin[1] - owner.userData.origin[1],
                                        cube.userData.origin[2] - owner.userData.origin[2]
                                    );
                                    cube.userData.parent = owner;
                                    outliner.add(cube);
                                }
                            });
                        } else {
                            appendChild.call(this, child, outliner);
                        }
                    });
                }
            }

            {
                let base_outliner;
                let owner = this.object;
                data.outliner.forEach(outline => {
                    if (typeof outline === "object") {
                        appendChild.call(this, outline, this.object);
                    } else if (typeof outline === "string") {
                        if (!base_outliner) {
                            base_outliner = new THREE.Object3D();
                            base_outliner.name = "__root__";
                            base_outliner.position.set(8, 8, 8);
                            base_outliner.userData.center = [8, 8, 8];
                            base_outliner.userData.origin = [8, 8, 8];
                            base_outliner.userData.isRoot = true;
                            this.parts[base_outliner.name] = base_outliner;
                            owner.add(base_outliner);
                        }
                        let child_uuid = outline;
                        cubes.forEach(cube => {
                            if (cube.userData.uuid == child_uuid) {
                                cube.position.set(
                                    cube.userData.origin[0] - owner.userData.origin[0],
                                    cube.userData.origin[1] - owner.userData.origin[1],
                                    cube.userData.origin[2] - owner.userData.origin[2]
                                );
                                cube.userData.parent = owner;
                                base_outliner.add(cube);
                            }
                        });
                    }
                });
            }

            if (!this.defaultOrigin) {
                this.object.children.forEach(child => {
                    resetOrigin(child, child.userData.origin);

                    function resetOrigin(member, origin) {
                        if (member.type == "Object3D") {
                            if (member.userData.isRoot) {
                                let pos = member.position;
                                member.position.set(pos.x - origin[0], pos.y - origin[1], pos.z - origin[1]);
                                if (member.children) {
                                    member.children.forEach((child2) => resetOrigin(child2, member.userData.origin));
                                }
                            }
                        }
                    }
                });
            }

        }

        if (typeof onload === "function") {
            onload.call(this, this.object, this.parts);
        }
    }

    if (typeof this.filename == "string") {
        let self = this;
        $.getJSON(this.filename, function (data) {
            load.call(self, data)
        });
    } else if (this.file instanceof Blob) {
        let self = this;
        let reader = new FileReader();
        reader.onload = function () {
            load.call(self, JSON.parse(this.result));
        }
        reader.readAsText(this.file);
    }

    return this;
}

BBModelLoader.prototype.recalcUV = function (images) {
    if (this.format != "java_block") throw "not a block model.";
    if (this.tex_length > images.length) throw "not enough textures.";

    let tex_sizes = []
    for (let i = 0; i < this.tex_length; i++) {
        let img = images[i] instanceof Image || images[i] instanceof HTMLCanvasElement ? images[i] : document.querySelector(images[i]);
        tex_sizes.push({ width: this.resolution.width, height: (img.height / img.width) * this.resolution.width });
    }

    this.meshes.forEach(mesh => {
        mesh.geometry.dispose()
        mesh.geometry = new THREE.MCBoxGeometryUV({ size: mesh.userData.size, resolution: this.resolution, faces: mesh.userData.faces, tex_sizes: tex_sizes })
    })
    return this;
}

BBModelLoader.prototype.recalcEntityUV = function (animate_count) {
    this.meshes.forEach(mesh => {
        mesh.geometry.faceVertexUvs[0].forEach(uv => {
            uv.forEach(vector => {
                vector.y = vector.y / animate_count + (animate_count - 1) / animate_count;
            })
        })
    })
}

BBModelLoader.prototype.constructor = BBModelLoader;


// ============================================================
// 3. 辅助函数
// ============================================================

function createCanvas(width, height) {
    let canvas = document.createElement("canvas");
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    canvas.width = width;
    canvas.height = height;
    let context = canvas.getContext('2d');
    context.imageSmoothingEnabled = false;
    return { canvas: canvas, context: context }
}

function imageToCanvas(element, isBlock) {
    var img = document.querySelector(element);
    return imageToCanvas2(img, isBlock);
}

function imageToCanvas2(img, isBlock) {
    var canvas = createCanvas(img.width, isBlock ? img.width : img.height);
    canvas.context.clearRect(0, 0, img.width, isBlock ? img.width : img.height);
    canvas.context.drawImage(img, 0, 0, img.width, isBlock ? img.width : img.height, 0, 0, img.width, isBlock ? img.width : img.height);
    return canvas.canvas;
}

async function createAlphaMap(canvas, opacity, alphaType, isBlock) {
    if (!canvas) return;
    let img;
    let img_ctx;
    let isImage;
    if (canvas.tagName == "IMG" || canvas.src) {
        isImage = true;
        let tmp = createCanvas(canvas.width, isBlock ? canvas.width : canvas.height);
        img = tmp.canvas;
        img_ctx = tmp.context;
        tmp.context.clearRect(0, 0, img.width, img.height);
        tmp.context.drawImage(canvas, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
    } else {
        isImage = false;
        img = canvas;
        img_ctx = img.getContext('2d');
    }
    opacity = opacity ? opacity : 1;
    let img_data = img_ctx.getImageData(0, 0, img.width, img.height);
    let texture_canvas = createCanvas(img.width, img.height);
    let crop = value => value < 256 ? value : 255;
    for (let x = 0; x < img.width; x++) {
        for (let y = 0; y < img.height; y++) {
            let d = (x + y * img_data.width) * 4;
            let data = img_data.data;
            if (alphaType == BBModelLoader.alphaByColor) {
                if (data[d + 3] > 0) {
                    let alpha = ((data[d + 0] + data[d + 1] + data[d + 2]) / 3) / 255;
                    let gamma = data[d + 3] / 255
                    alpha = Math.pow(alpha, gamma) * 255
                    data[d + 0] = Math.floor(crop(alpha * opacity));
                    data[d + 1] = Math.floor(crop(alpha * opacity));
                    data[d + 2] = Math.floor(crop(alpha * opacity));
                } else {
                    data[d + 0] = 0;
                    data[d + 1] = 0;
                    data[d + 2] = 0;
                }
            } else if (alphaType == BBModelLoader.alphaByGamma) {
                if (data[d + 3] > 0) {
                    let alpha = ((data[d + 0] + data[d + 1] + data[d + 2]) / 3) / 255;
                    let gamma = data[d + 3] / 255
                    alpha = Math.pow(alpha, gamma / 100) * 255
                    data[d + 0] = Math.floor(crop(alpha * gamma * opacity));
                    data[d + 1] = Math.floor(crop(alpha * gamma * opacity));
                    data[d + 2] = Math.floor(crop(alpha * gamma * opacity));
                } else {
                    data[d + 0] = 0;
                    data[d + 1] = 0;
                    data[d + 2] = 0;
                }
            } else if (alphaType == BBModelLoader.alphaByWhite) {
                let min = Math.min(data[d + 0], data[d + 1], data[d + 2])
                let max = Math.max(data[d + 0], data[d + 1], data[d + 2])
                if (data[d + 3] > 0 && data[d + 0] > 0 && max - min < 4) {
                    let alpha = ((data[d + 0] + data[d + 1] + data[d + 2]) / 3) / 255;
                    alpha = data[d + 0]
                    data[d + 0] = Math.floor(crop(alpha * opacity));
                    data[d + 1] = Math.floor(crop(alpha * opacity));
                    data[d + 2] = Math.floor(crop(alpha * opacity));
                } else {
                    data[d + 0] = 0;
                    data[d + 1] = 0;
                    data[d + 2] = 0;
                    data[d + 3] = 0;
                }
            } else if (alphaType == BBModelLoader.alphaByAlpha2) {
                let alpha = crop(data[d + 3] / (255 * opacity) * 255 + (255 * opacity - 255))
                data[d + 0] = Math.floor(alpha);
                data[d + 1] = Math.floor(alpha);
                data[d + 2] = Math.floor(alpha);
            } else if (alphaType == BBModelLoader.alphaByZero) {
                let alpha = data[d + 3] > 0 ? 255 : 0;
                data[d + 0] = Math.floor(alpha);
                data[d + 1] = Math.floor(alpha);
                data[d + 2] = Math.floor(alpha);
            } else {
                data[d + 0] = Math.floor(crop(data[d + 3] * opacity));
                data[d + 1] = Math.floor(crop(data[d + 3] * opacity));
                data[d + 2] = Math.floor(crop(data[d + 3] * opacity));
            }
            data[d + 3] = 255;
        }
    }
    texture_canvas.context.putImageData(img_data, 0, 0);

    if (isImage) { img.remove() }
    let texture = new THREE.CanvasTexture(texture_canvas.canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.type = THREE.FloatType;
    return texture;
}

async function removeAlpha(canvas, isBlock) {
    if (!canvas) return;
    let img;
    let img_ctx;
    let isImage;
    if (canvas.tagName == "IMG" || canvas.src) {
        canvas = await imageReLoader(canvas)
        isImage = true;
        let tmp = createCanvas(canvas.width, isBlock ? canvas.width : canvas.height);
        img = tmp.canvas;
        img_ctx = tmp.context;
        tmp.context.clearRect(0, 0, img.width, img.height);
        tmp.context.drawImage(canvas, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
    } else {
        isImage = false;
        img = canvas;
        img_ctx = img.getContext('2d');
    }
    let img_data = img_ctx.getImageData(0, 0, img.width, img.height);
    let texture_canvas = createCanvas(img.width, img.height);
    for (let x = 0; x < img.width; x++) {
        for (let y = 0; y < img.height; y++) {
            let d = (x + y * img_data.width) * 4;
            let data = img_data.data;
            if (data[d + 3] > 0) data[d + 3] = 255;
        }
    }
    texture_canvas.context.putImageData(img_data, 0, 0);

    if (isImage) { img.remove() }
    let texture = new THREE.CanvasTexture(texture_canvas.canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.type = THREE.FloatType;
    return texture;
}

async function removeAlpha2(canvas, isBlock) {
    if (!canvas) return;
    let img;
    let img_ctx;
    let isImage;
    if (canvas.tagName == "IMG" || canvas.src) {
        canvas = await imageReLoader(canvas)
        isImage = true;
        let tmp = createCanvas(canvas.width, isBlock ? canvas.width : canvas.height);
        img = tmp.canvas;
        img_ctx = tmp.context;
        tmp.context.clearRect(0, 0, img.width, img.height);
        tmp.context.drawImage(canvas, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
    } else {
        isImage = false;
        img = canvas;
        img_ctx = img.getContext('2d');
    }
    let img_data = img_ctx.getImageData(0, 0, img.width, img.height);
    let texture_canvas = createCanvas(img.width, img.height);
    for (let x = 0; x < img.width; x++) {
        for (let y = 0; y < img.height; y++) {
            let d = (x + y * img_data.width) * 4;
            let data = img_data.data;
            data[d + 3] = data[d + 3] > 128 ? 255 : 0;
        }
    }
    texture_canvas.context.putImageData(img_data, 0, 0);

    if (isImage) { img.remove() }
    let texture = new THREE.CanvasTexture(texture_canvas.canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.type = THREE.FloatType;
    return texture;
}

async function imageReLoader(img, src) {
    img = await (
        () => new Promise(resolve => {
            img.bak = src ? src : img.src
            img.src = ""
            img.onload = () => resolve(img)
            img.src = img.bak
        })
    )()
    return img
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

function rad2deg(rad) {
    return rad / (Math.PI / 180)
}

THREE.Euler.prototype.toDeg = function () {
    return { x: rad2deg(this.x), y: rad2deg(this.y), z: rad2deg(this.z) }
}

THREE.Object3D.prototype.lookAt2 = function (targetPosition) {
    var targetPos = this.worldToLocal(targetPosition.clone());
    var rotationAxis = new THREE.Vector3().crossVectors(
        new THREE.Vector3(0, 0, 1),
        targetPos
    ).normalize();
    var angle = new THREE.Vector3(0, 0, 1).angleTo(targetPos.normalize().clone());

    this.rotateOnAxis(rotationAxis, angle);
}

function dye_color(dest_canvas, src_canvas, dye_color, opacity, isBlock) {
    opacity = opacity ? opacity : 1;
    let power = 1;
    let src_img = document.querySelector(src_canvas);
    let isNotCanvas = src_img.tagName == "IMG";
    if (isNotCanvas) {
        src_img = imageToCanvas(src_canvas);
    }
    let temp_canvas = document.querySelector(dest_canvas);
    let w = src_img.width,
        h = (isBlock ? src_img.width : src_img.height);
    temp_canvas.setAttribute("width", w);
    temp_canvas.setAttribute("height", h);
    let temp_ctx = temp_canvas.getContext("2d");
    temp_ctx.clearRect(0, 0, w, h);
    let src_ctx = src_img.getContext("2d");
    let img_data = src_ctx.getImageData(0, 0, w, h);
    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            let d = (x + y * img_data.width) * 4;
            let data = img_data.data;
            if (data[d + 3] > 0) {
                let default_col = { r: dye_color >> 16, g: (dye_color >> 8) & 0xFF, b: dye_color & 0xFF };
                let color = { r: data[d], g: data[d + 1], b: data[d + 2] };
                data[d + 0] = default_col.r * power * (color.r / 255);
                data[d + 1] = default_col.g * power * (color.g / 255);
                data[d + 2] = default_col.b * power * (color.b / 255);

                let alpha = data[d + 3] * opacity;
                data[d + 3] = alpha < 255 ? alpha : 255;
            }
        }
    }
    temp_ctx.putImageData(img_data, 0, 0);
    if (isNotCanvas) {
        src_img.remove();
    }
}

BBModelLoader.InitPromise = function (option) {
    this.loader = new BBModelLoader(option)
    return this;
}
BBModelLoader.InitPromise.prototype.loadEntity = function () {
    return new Promise(resolve => {
        this.loader.loadEntity(function (object, parts) {
            resolve({ loader: this, object: object, parts: parts })
        })
    })
}
BBModelLoader.InitPromise.prototype.loadBlock = function () {
    return new Promise(resolve => {
        this.loader.loadBlock(function (object, parts) {
            resolve({ loader: this, object: object, parts: parts })
        })
    })
}
BBModelLoader.InitPromise.prototype.constructor = BBModelLoader.InitPromise;


// ============================================================
// 4. 主代码
// ============================================================

var main_object;
var models;
var camera;
var loader;
var controls;
var texture_changed = false;
var tex_canvas;

$(function () {

    const width = 400 * 1;
    const height = 636 * 1;
    const zoom = 0.91;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas'),
        antialias: false,
        alpha: true,
        preserveDrawingBuffer: true
    });
    renderer.setClearColor(0xFF00FF, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    Object.keys(animations).forEach(key => {
        $("#pose_select").append(
            $("<option/>", { value: key, text: key })
        );
    });

    $("#pose_select option[value='default_pose']").prop("selected", true);

    $("#pose_select").change(function () {
        set_pose($("#pose_select option:selected").val());
    });

    $("#execute").on("click", function () {
        let img = document.querySelector("#drawed");
        img.src = renderer.domElement.toDataURL('image/png');
        img.style.display = 'block';
    });

    $("#reset").on("click", function () {
        controls.reset();
        main_object.rotation.y = 0;
    });

    $("#rotate").on("click", function () {
        main_object.rotation.y = (main_object.rotation.y + 0.7853981633974483) % 6.283185307179586;
    });

    $("#size").change(function () {
        let canvas = document.querySelector("#myCanvas");
        let mag = $("#size").prop("checked") ? 3.0 : 1.0;
        let w = Math.floor(400 * mag);
        let h = Math.floor(636 * mag);

        controls.reset();

        let aspectRatio = w / h,
            viewSize = 268.2;

        canvas.width = w;
        canvas.height = h;
        renderer.setSize(w, h);

        camera.left = -aspectRatio * viewSize / 2;
        camera.right = aspectRatio * viewSize / 2;
        camera.top = viewSize / 2;
        camera.bottom = -viewSize / 2;

        camera.updateProjectionMatrix();
        controls.saveState();
    });

    $("#file").change(function (e) {
        let files = e.currentTarget.files;

        let onload = async function () {
            let canvas = document.querySelector("#canvas");
            let context = canvas.getContext("2d");

            context.clearRect(0, 0, 64, 64);
            context.drawImage(this, 0, 0);
            if (this.height < 64) {
                convert64(context, this);
            }

            loader.materials[0].map.image = canvas;
            loader.materials[0].map.needsUpdate = true;

            let material2 = loader.materials[0].clone();
            let alpha = await createAlphaMap(canvas, 1, BBModelLoader.alphaByAlpha);
            material2.alphaMap = alpha;
            material2.transparent = true;
            loader.materials[1] = material2;

            texture_changed = true;
        };

        if (files.length && files[0].type.match('image.*')) {
            let fileRdr = new FileReader();
            fileRdr.self = this;
            fileRdr.onload = function () {
                let img = new Image();
                img.onload = onload;
                img.src = this.result;
            };
            fileRdr.readAsDataURL(files[0]);
        }
    });

    $("#isAlex").change(function () {

        if (!texture_changed) {
            let tex = document.querySelector($(this).prop("checked") ? "#alex" : "#steve");
            tex_canvas.context.clearRect(0, 0, 64, 64);
            tex_canvas.context.drawImage(tex, 0, 0);
            loader.materials[0].map.needsUpdate = true;
        }

        let setUVS = function (mesh, uvs, overlay) {
            for (let i = 0; i < mesh.geometry.faceVertexUvs[0].length; i++) {
                let face = mesh.geometry.faceVertexUvs[0][i];
                for (let j = 0; j < 3; j++) {
                    face[j].x = (uvs[i][j].x + (overlay == 2 ? 16 : 0)) / 64;
                    face[j].y = (uvs[i][j].y - (overlay == 1 ? 16 : 0)) / 64;
                    face[j].z = (uvs[i][j].z + (overlay == 2 ? 16 : 0)) / 64;
                }
            }
            mesh.geometry.uvsNeedUpdate = true;
        };

        let checked = $("#isAlex").prop("checked");
        if (checked) {
            // Alex
            models.leftArm.children[0].children[0].geometry.vertices.forEach(vertex => {
                vertex.x = Math.sign(vertex.x) * 1.5;
                vertex.y = Math.sign(vertex.y) * 6;
                vertex.z = Math.sign(vertex.z) * 2;
            });
            models.leftArm.children[0].children[0].geometry.verticesNeedUpdate = true;

            models.leftArm.children[1].children[0].geometry.vertices.forEach(vertex => {
                vertex.x = Math.sign(vertex.x) * 1.7;
                vertex.y = Math.sign(vertex.y) * 6.2;
                vertex.z = Math.sign(vertex.z) * 2.2;
            });
            models.leftArm.children[1].children[0].geometry.verticesNeedUpdate = true;

            models.rightArm.children[0].children[0].geometry.vertices.forEach(vertex => {
                vertex.x = Math.sign(vertex.x) * 1.5;
                vertex.y = Math.sign(vertex.y) * 6;
                vertex.z = Math.sign(vertex.z) * 2;
            });
            models.rightArm.children[0].children[0].geometry.verticesNeedUpdate = true;

            models.rightArm.children[1].children[0].geometry.vertices.forEach(vertex => {
                vertex.x = Math.sign(vertex.x) * 1.7;
                vertex.y = Math.sign(vertex.y) * 6.2;
                vertex.z = Math.sign(vertex.z) * 2.2;
            });
            models.rightArm.children[1].children[0].geometry.verticesNeedUpdate = true;

            models.leftArm.children[0].children[0].position.set(-5.5, 18.5, 0);
            models.rightArm.children[0].children[0].position.set(5.5, 18.5, 0);
            models.leftArm.children[1].children[0].position.set(-5.5, 18.5, 0);
            models.rightArm.children[1].children[0].position.set(5.5, 18.5, 0);
            models.leftArm.children[0].position.y = -22.5;
            models.rightArm.children[0].position.y = -22.5;
            models.leftArm.children[1].position.y = -22.5;
            models.rightArm.children[1].position.y = -22.5;
            models.leftArm.position.y = 21.5;
            models.rightArm.position.y = 21.5;

            let uvs = [
                [
                    [{ x: 47, y: 32 }, { x: 51, y: 32 }, { x: 47, y: 44 }],
                    [{ x: 51, y: 44 }, { x: 47, y: 44 }, { x: 51, y: 32 }],
                    [{ x: 44, y: 44 }, { x: 40, y: 32 }, { x: 44, y: 32 }],
                    [{ x: 40, y: 32 }, { x: 44, y: 44 }, { x: 40, y: 44 }],
                    [{ x: 44, y: 44 }, { x: 47, y: 48 }, { x: 44, y: 48 }],
                    [{ x: 47, y: 48 }, { x: 44, y: 44 }, { x: 47, y: 44 }],
                    [{ x: 47, y: 48 }, { x: 50, y: 48 }, { x: 47, y: 44 }],
                    [{ x: 50, y: 44 }, { x: 47, y: 44 }, { x: 50, y: 48 }],
                    [{ x: 44, y: 32 }, { x: 47, y: 32 }, { x: 44, y: 44 }],
                    [{ x: 47, y: 44 }, { x: 44, y: 44 }, { x: 47, y: 32 }],
                    [{ x: 54, y: 44 }, { x: 51, y: 32 }, { x: 54, y: 32 }],
                    [{ x: 51, y: 32 }, { x: 54, y: 44 }, { x: 51, y: 44 }],
                ],
                [
                    [{ x: 39, y: 0 }, { x: 43, y: 0 }, { x: 39, y: 12 }],
                    [{ x: 43, y: 12 }, { x: 39, y: 12 }, { x: 43, y: 0 }],
                    [{ x: 36, y: 12 }, { x: 32, y: 0 }, { x: 36, y: 0 }],
                    [{ x: 32, y: 0 }, { x: 36, y: 12 }, { x: 32, y: 12 }],
                    [{ x: 36, y: 12 }, { x: 39, y: 16 }, { x: 36, y: 16 }],
                    [{ x: 39, y: 16 }, { x: 36, y: 12 }, { x: 39, y: 12 }],
                    [{ x: 39, y: 16 }, { x: 42, y: 16 }, { x: 39, y: 12 }],
                    [{ x: 42, y: 12 }, { x: 39, y: 12 }, { x: 42, y: 16 }],
                    [{ x: 36, y: 0 }, { x: 39, y: 0 }, { x: 36, y: 12 }],
                    [{ x: 39, y: 12 }, { x: 36, y: 12 }, { x: 39, y: 0 }],
                    [{ x: 46, y: 12 }, { x: 43, y: 0 }, { x: 46, y: 0 }],
                    [{ x: 43, y: 0 }, { x: 46, y: 12 }, { x: 43, y: 12 }],
                ],
            ];

            setUVS(models.leftArm.children[0].children[0], uvs[0]);
            setUVS(models.leftArm.children[1].children[0], uvs[0], 1);
            setUVS(models.rightArm.children[0].children[0], uvs[1]);
            setUVS(models.rightArm.children[1].children[0], uvs[1], 2);

        } else {
            // Steve
            models.leftArm.children[0].children[0].geometry.vertices.forEach(vertex => {
                vertex.x = Math.sign(vertex.x) * 2;
                vertex.y = Math.sign(vertex.y) * 6;
                vertex.z = Math.sign(vertex.z) * 2;
            });
            models.leftArm.children[0].children[0].geometry.verticesNeedUpdate = true;

            models.leftArm.children[1].children[0].geometry.vertices.forEach(vertex => {
                vertex.x = Math.sign(vertex.x) * 2.2;
                vertex.y = Math.sign(vertex.y) * 6.2;
                vertex.z = Math.sign(vertex.z) * 2.2;
            });
            models.leftArm.children[1].children[0].geometry.verticesNeedUpdate = true;

            models.rightArm.children[0].children[0].geometry.vertices.forEach(vertex => {
                vertex.x = Math.sign(vertex.x) * 2;
                vertex.y = Math.sign(vertex.y) * 6;
                vertex.z = Math.sign(vertex.z) * 2;
            });
            models.rightArm.children[0].children[0].geometry.verticesNeedUpdate = true;

            models.rightArm.children[1].children[0].geometry.vertices.forEach(vertex => {
                vertex.x = Math.sign(vertex.x) * 2.2;
                vertex.y = Math.sign(vertex.y) * 6.2;
                vertex.z = Math.sign(vertex.z) * 2.2;
            });
            models.rightArm.children[1].children[0].geometry.verticesNeedUpdate = true;

            models.leftArm.children[0].children[0].position.set(-6, 18, 0);
            models.rightArm.children[0].children[0].position.set(6, 18, 0);
            models.leftArm.children[1].children[0].position.set(-6, 18, 0);
            models.rightArm.children[1].children[0].position.set(6, 18, 0);
            models.leftArm.children[0].position.y = -22;
            models.rightArm.children[0].position.y = -22;
            models.leftArm.children[1].position.y = -22;
            models.rightArm.children[1].position.y = -22;
            models.leftArm.position.y = 22;
            models.rightArm.position.y = 22;

            let uvs = [
                [
                    [{ x: 48, y: 32 }, { x: 52, y: 32 }, { x: 48, y: 44 }],
                    [{ x: 52, y: 44 }, { x: 48, y: 44 }, { x: 52, y: 32 }],
                    [{ x: 44, y: 44 }, { x: 40, y: 32 }, { x: 44, y: 32 }],
                    [{ x: 40, y: 32 }, { x: 44, y: 44 }, { x: 40, y: 44 }],
                    [{ x: 44, y: 44 }, { x: 48, y: 48 }, { x: 44, y: 48 }],
                    [{ x: 48, y: 48 }, { x: 44, y: 44 }, { x: 48, y: 44 }],
                    [{ x: 48, y: 48 }, { x: 52, y: 48 }, { x: 48, y: 44 }],
                    [{ x: 52, y: 44 }, { x: 48, y: 44 }, { x: 52, y: 48 }],
                    [{ x: 44, y: 32 }, { x: 48, y: 32 }, { x: 44, y: 44 }],
                    [{ x: 48, y: 44 }, { x: 44, y: 44 }, { x: 48, y: 32 }],
                    [{ x: 56, y: 44 }, { x: 52, y: 32 }, { x: 56, y: 32 }],
                    [{ x: 52, y: 32 }, { x: 56, y: 44 }, { x: 52, y: 44 }],
                ],
                [
                    [{ x: 40, y: 0 }, { x: 44, y: 0 }, { x: 40, y: 12 }],
                    [{ x: 44, y: 12 }, { x: 40, y: 12 }, { x: 44, y: 0 }],
                    [{ x: 36, y: 12 }, { x: 32, y: 0 }, { x: 36, y: 0 }],
                    [{ x: 32, y: 0 }, { x: 36, y: 12 }, { x: 32, y: 12 }],
                    [{ x: 36, y: 12 }, { x: 40, y: 16 }, { x: 36, y: 16 }],
                    [{ x: 40, y: 16 }, { x: 36, y: 12 }, { x: 40, y: 12 }],
                    [{ x: 40, y: 16 }, { x: 44, y: 16 }, { x: 40, y: 12 }],
                    [{ x: 44, y: 12 }, { x: 40, y: 12 }, { x: 44, y: 16 }],
                    [{ x: 36, y: 0 }, { x: 40, y: 0 }, { x: 36, y: 12 }],
                    [{ x: 40, y: 12 }, { x: 36, y: 12 }, { x: 40, y: 0 }],
                    [{ x: 48, y: 12 }, { x: 44, y: 0 }, { x: 48, y: 0 }],
                    [{ x: 44, y: 0 }, { x: 48, y: 12 }, { x: 44, y: 12 }],
                ]
            ];

            setUVS(models.leftArm.children[0].children[0], uvs[0]);
            setUVS(models.leftArm.children[1].children[0], uvs[0], 1);
            setUVS(models.rightArm.children[0].children[0], uvs[1]);
            setUVS(models.rightArm.children[1].children[0], uvs[1], 2);
        }
    });

    let convert64 = function (context, img) {
        let m = val => Math.floor(val * (img.width / 64));

        context.translate(img.width, 0);
        context.scale(-1, 1);
        context.drawImage(img, m(4), m(16), m(4), m(4), m(40), m(48), m(4), m(4));
        context.drawImage(img, m(8), m(16), m(4), m(4), m(36), m(48), m(4), m(4));
        context.drawImage(img, m(0), m(20), m(4), m(12), m(44), m(52), m(4), m(12));
        context.drawImage(img, m(4), m(20), m(4), m(12), m(40), m(52), m(4), m(12));
        context.drawImage(img, m(8), m(20), m(4), m(12), m(36), m(52), m(4), m(12));
        context.drawImage(img, m(12), m(20), m(4), m(12), m(32), m(52), m(4), m(12));

        context.drawImage(img, m(44), m(16), m(4), m(4), m(24), m(48), m(4), m(4));
        context.drawImage(img, m(48), m(16), m(4), m(4), m(20), m(48), m(4), m(4));
        context.drawImage(img, m(40), m(20), m(4), m(12), m(28), m(52), m(4), m(12));
        context.drawImage(img, m(44), m(20), m(4), m(12), m(24), m(52), m(4), m(12));
        context.drawImage(img, m(48), m(20), m(4), m(12), m(20), m(52), m(4), m(12));
        context.drawImage(img, m(52), m(20), m(4), m(12), m(16), m(52), m(4), m(12));

        context.restore(0, 0);
        context.resetTransform();
    };

    const scene = new THREE.Scene();

    let pos_x = 0,
        pos_y = -144,
        pos_z = 0;

    let img = document.querySelector("#steve");

    let temp = img.src;
    img.src = "";
    img.src = temp;
    img.onload = function () {

        let canvas = createCanvas(64, 64);
        canvas.context.drawImage(img, 0, 0);
        canvas.canvas.setAttribute("id", "canvas");
        $(canvas.canvas).appendTo("#thumb");
        tex_canvas = canvas;

        if (img.height < 64) {
            convert64(canvas.context, img);
        }

        loader = new BBModelLoader({
            filename: json_url,
            texture_name: ["#canvas"],
            side: THREE.DoubleSide,
        }).loadEntity(function (object, parts) {
            main_object = object;
            models = parts;

            let material2 = loader.materials[0].clone();
            loader.materials[1] = material2;
            Object.keys(loader.parts).forEach(key => {
                let mesh = loader.parts[key].children[1].children[0];
                let geo = loader.parts[key].children[1].children[0].geometry;
                mesh.material = loader.materials;
                geo.faces.forEach(face => {
                    face.materialIndex = 1;
                });
            });

            object.scale.set(8.5, 8.5, 8.5);
            object.position.set(pos_x, pos_y, pos_z);

            scene.add(object);
            Render(scene);
        });
    };

    function Render(scene) {

        var viewSize = 268.2;

        var aspectRatio = width / height;
        camera = new THREE.OrthographicCamera(
            -aspectRatio * viewSize / 2,
            aspectRatio * viewSize / 2,
            viewSize / 2,
            -viewSize / 2,
            -1000,
            1000
        );

        camera.position.set(viewSize, viewSize * 0.8168, viewSize);
        camera.lookAt(scene.position);
        camera.zoom = zoom;
        camera.updateProjectionMatrix();
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableKeys = false;

        const dirLight = new THREE.DirectionalLight(0xFFFFFF);
        dirLight.intensity = 0.45;
        dirLight.position.set(-1.25, 4.25, 1.24).normalize();
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;
        var d = 50;
        dirLight.shadow.camera.left = -d;
        dirLight.shadow.camera.right = d;
        dirLight.shadow.camera.top = d;
        dirLight.shadow.camera.bottom = -d;
        dirLight.shadow.camera.far = 3500;
        dirLight.shadow.bias = -0.0001;
        scene.add(dirLight);
        var ambientLight = new THREE.AmbientLight(0xFCFCFF);
        ambientLight.intensity = 0.618;
        scene.add(ambientLight);

        tick();

        function tick() {
            renderer.render(scene, camera);
            requestAnimationFrame(tick);
        }
    }
});

function set_pose(pose_name) {

    let setrotation = (parts, values) => {
        parts.rotation.set(0, 0, 0);
        let axis = new THREE.Vector3(1, 0, 0);
        parts.rotateOnWorldAxis(axis, deg2rad(values[0]));
        axis.set(0, 1, 0);
        parts.rotateOnWorldAxis(axis, deg2rad(values[1]));
        axis.set(0, 0, 1);
        parts.rotateOnWorldAxis(axis, deg2rad(values[2]));
    };

    if (animations.hasOwnProperty(pose_name)) {
        pose = animations[pose_name];

        setrotation(models.head, pose.bones.head.rotation);
        setrotation(models.body, pose.bones.body.rotation);
        setrotation(models.rightArm, pose.bones.leftarm.rotation);
        setrotation(models.leftArm, pose.bones.rightarm.rotation);
        setrotation(models.rightLeg, pose.bones.leftleg.rotation);
        setrotation(models.leftLeg, pose.bones.rightleg.rotation);
    }

}

var animations = {
    "default_pose": {
        "loop": true,
        "bones": {
            "body": { "rotation": [0, 0, 0] },
            "head": { "rotation": [0, 0, 0] },
            "leftarm": { "rotation": [0, 0, 5] },
            "leftleg": { "rotation": [0, 0, 0] },
            "rightarm": { "rotation": [0, 0, -5] },
            "rightitem": { "rotation": [0, 0, 0] },
            "rightleg": { "rotation": [0, 0, 0] }
        }
    },
    "no_pose": {
        "loop": true,
        "bones": {
            "body": { "rotation": [0, 0, 0] },
            "head": { "rotation": [0, 0, 0] },
            "leftarm": { "rotation": [0, 0, 0] },
            "leftleg": { "rotation": [0, 0, 0] },
            "rightarm": { "rotation": [0, 0, 0] },
            "rightitem": { "rotation": [0, 0, 0] },
            "rightleg": { "rotation": [0, 0, 0] }
        }
    },
    "default_armor_stand_pose": {
        "loop": true,
        "bones": {
            "body": { "rotation": [0, 0, 0] },
            "head": { "rotation": [-1, -7, 0] },
            "leftarm": { "rotation": [-10, 0, 10] },
            "leftleg": { "rotation": [-1, 0, 1] },
            "rightarm": { "rotation": [-15, 0, -10] },
            "rightitem": { "rotation": [0, 0, 0] },
            "rightleg": { "rotation": [1, 0, -1] }
        }
    },
    "solemn_pose": {
        "loop": true,
        "bones": {
            "body": { "rotation": [0, 0, -2] },
            "head": { "rotation": [15, 0, 0] },
            "leftarm": { "rotation": [-30, -15, -15] },
            "leftleg": { "rotation": [-1, 0, 1] },
            "rightarm": { "rotation": [-60, 20, 10] },
            "rightitem": { "rotation": [0, 0, 0] },
            "rightleg": { "rotation": [1, 0, -1] }
        }
    },
    "athena_pose": {
        "loop": true,
        "bones": {
            "body": { "rotation": [0, 0, -2] },
            "head": { "rotation": [-5, 0, 0] },
            "leftarm": { "rotation": [10, 0, 5] },
            "leftleg": { "rotation": [-3, 3, 3] },
            "rightarm": { "rotation": [-60, -20, 10] },
            "rightitem": { "rotation": [0, 0, 0] },
            "rightleg": { "rotation": [3, -3, -3] }
        }
    },
    "brandish_pose": {
        "loop": true,
        "bones": {
            "body": { "rotation": [0, 0, 2] },
            "head": { "rotation": [-15, 0, 0] },
            "leftarm": { "rotation": [20, 0, 10] },
            "leftleg": { "rotation": [5, 3, 3] },
            "rightarm": { "rotation": [-110, -50, 0] },
            "rightitem": { "rotation": [0, 0, 0] },
            "rightleg": { "rotation": [-5, -3, -3] }
        }
    },
    "honor_pose": {
        "loop": true,
        "bones": {
            "body": { "rotation": [0, 0, 0] },
            "head": { "rotation": [-15, 0, 0] },
            "leftarm": { "rotation": [-110, -35, 0] },
            "leftleg": { "rotation": [5, 3, 3] },
            "rightarm": { "rotation": [-110, 35, 0] },
            "rightitem": { "rotation": [0, 0, 0] },
            "rightleg": { "rotation": [-5, -3, -3] }
        }
    },
    "entertain_pose": {
        "loop": true,
        "bones": {
            "body": { "rotation": [0, 0, 0] },
            "head": { "rotation": [-15, 0, 0] },
            "leftarm": { "rotation": [-110, 35, 0] },
            "leftleg": { "rotation": [5, 3, 3] },
            "rightarm": { "rotation": [-110, -35, 0] },
            "rightitem": { "rotation": [0, 0, 0] },
            "rightleg": { "rotation": [-5, -3, -3] }
        }
    },
    "salute_pose": {
        "loop": true,
        "bones": {
            "body": { "rotation": [0, 0, 0] },
            "head": { "rotation": [0, 0, 0] },
            "leftarm": { "rotation": [10, 0, 5] },
            "leftleg": { "rotation": [-1, 0, 1] },
            "rightarm": { "rotation": [-70, 40, 0] },
            "rightitem": { "rotation": [0, 0, 0] },
            "rightleg": { "rotation": [1, 0, -1] }
        }
    },
    "hero_pose": {
        "loop": true,
        "bones": {
            "body": { "rotation": [0, -8, 0] },
            "head": { "rotation": [-4, -67, 0] },
            "leftarm": { "rotation": [16, -32, 8] },
            "leftleg": { "rotation": [0, 75, 8] },
            "rightarm": { "rotation": [-99, -63, 0] },
            "rightitem": { "rotation": [0, 0, 0] },
            "rightleg": { "rotation": [4, -63, -8] }
        }
    },
    "riposte_pose": {
        "loop": true,
        "bones": {
            "body": { "rotation": [0, 0, 0] },
            "head": { "rotation": [16, -20, 0] },
            "leftarm": { "rotation": [4, -8, -237] },
            "leftleg": { "rotation": [-14, 18, 16] },
            "rightarm": { "rotation": [246, 0, -89] },
            "rightitem": { "rotation": [0, -180, 0] },
            "rightleg": { "rotation": [8, -20, -4] }
        }
    },
    "zombie_pose": {
        "loop": true,
        "bones": {
            "body": { "rotation": [0, 0, 0] },
            "head": { "rotation": [-10, 0, 5] },
            "leftarm": { "rotation": [-105, 0, 0] },
            "leftleg": { "rotation": [7, 0, 0] },
            "rightarm": { "rotation": [-100, 0, 0] },
            "rightitem": { "rotation": [0, 0, 0] },
            "rightleg": { "rotation": [-46, 0, 0] }
        }
    },
    "cancan_a_pose": {
        "loop": true,
        "bones": {
            "body": { "rotation": [0, -22, 0] },
            "head": { "rotation": [-5, -18, 0] },
            "leftarm": { "rotation": [8, 0, 114] },
            "leftleg": { "rotation": [-111, -55, 0] },
            "rightarm": { "rotation": [0, -84, -111] },
            "rightitem": { "rotation": [0, 0, 0] },
            "rightleg": { "rotation": [0, -23, 13] }
        }
    },
    "cancan_b_pose": {
        "loop": true,
        "bones": {
            "body": { "rotation": [0, 18, 0] },
            "head": { "rotation": [-10, 20, 0] },
            "leftarm": { "rotation": [0, 0, 112] },
            "leftleg": { "rotation": [0, 0, -13] },
            "rightarm": { "rotation": [8, -90, -111] },
            "rightitem": { "rotation": [0, 0, 0] },
            "rightleg": { "rotation": [-119, 42, 0] }
        }
    },
};

var json_url = "data:application/json;base64,ewogICJtZXRhIjogewogICAgImZvcm1hdF92ZXJzaW9uIjogIjUuMCIsCiAgICAibW9kZWxfZm9ybWF0IjogImJlZHJvY2siLAogICAgImJveF91diI6IHRydWUKICB9LAogICJuYW1lIjogInBsYXllciIsCiAgIm1vZGVsX2lkZW50aWZpZXIiOiAiaHVtYW5vaWQuY3VzdG9tOmdlb21ldHJ5Lmh1bWFub2lkIiwKICAidmlzaWJsZV9ib3giOiBbMywgMywgMS41XSwKICAicmVzb2x1dGlvbiI6IHsKICAgICJ3aWR0aCI6IDY0LAogICAgImhlaWdodCI6IDY0CiAgfSwKICAiZWxlbWVudHMiOiBbCiAgICB7CiAgICAgICJuYW1lIjogImJvZHkiLAogICAgICAiZnJvbSI6IFstNCwgMTIsIC0yXSwKICAgICAgInRvIjogWzQsIDI0LCAyXSwKICAgICAgInV2X29mZnNldCI6IFsxNiwgMTZdLAogICAgICAiZmFjZXMiOiB7CiAgICAgICAgIm5vcnRoIjogeyAidXYiOiBbMjAsIDIwLCAyOCwgMzJdIH0sCiAgICAgICAgImVhc3QiOiB7ICJ1diI6IFsxNiwgMjAsIDIwLCAzMl0gfSwKICAgICAgICAic291dGgiOiB7ICJ1diI6IFszMiwgMjAsIDQwLCAzMl0gfSwKICAgICAgICAid2VzdCI6IHsgInV2IjogWzI4LCAyMCwgMzIsIDMyXSB9LAogICAgICAgICJ1cCI6IHsgInV2IjogWzI4LCAyMCwgMjAsIDE2XSB9LAogICAgICAgICJkb3duIjogeyAidXYiOiBbMzYsIDE2LCAyOCwgMjBdIH0KICAgICAgfSwKICAgICAgInR5cGUiOiAiY3ViZSIsCiAgICAgICJ1dWlkIjogImVkNzZlNDRiLTBlOWEtZWZjMC1hZGRkLTg3NTMxZDVjMjYzNyIKICAgIH0sCiAgICB7CiAgICAgICJuYW1lIjogImhlYWQiLAogICAgICAiZnJvbSI6IFstNCwgMjQsIC00XSwKICAgICAgInRvIjogWzQsIDMyLCA0XSwKICAgICAgImZhY2VzIjogewogICAgICAgICJub3J0aCI6IHsgInV2IjogWzgsIDgsIDE2LCAxNl0gfSwKICAgICAgICAiZWFzdCI6IHsgInV2IjogWzAsIDgsIDgsIDE2XSB9LAogICAgICAgICJzb3V0aCI6IHsgInV2IjogWzI0LCA4LCAzMiwgMTZdIH0sCiAgICAgICAgIndlc3QiOiB7ICJ1diI6IFsxNiwgOCwgMjQsIDE2XSB9LAogICAgICAgICJ1cCI6IHsgInV2IjogWzE2LCA4LCA4LCAwXSB9LAogICAgICAgICJkb3duIjogeyAidXYiOiBbMjQsIDAsIDE2LCA4XSB9CiAgICAgIH0sCiAgICAgICJ0eXBlIjogImN1YmUiLAogICAgICAidXVpZCI6ICJiNjU0M2Y2Mi0zMWE5LTFlYjUtYjk0Zi1jMDliOWYwZjZiYzQiCiAgICB9LAogICAgewogICAgICAibmFtZSI6ICJoYXQiLAogICAgICAiZnJvbSI6IFstNCwgMjQsIC00XSwKICAgICAgInRvIjogWzQsIDMyLCA0XSwKICAgICAgImluZmxhdGUiOiAwLjUsCiAgICAgICJ1dl9vZmZzZXQiOiBbMzIsIDBdLAogICAgICAiZmFjZXMiOiB7CiAgICAgICAgIm5vcnRoIjogeyAidXYiOiBbNDAsIDgsIDQ4LCAxNl0gfSwKICAgICAgICAiZWFzdCI6IHsgInV2IjogWzMyLCA4LCA0MCwgMTZdIH0sCiAgICAgICAgInNvdXRoIjogeyAidXYiOiBbNTYsIDgsIDY0LCAxNl0gfSwKICAgICAgICAid2VzdCI6IHsgInV2IjogWzQ4LCA4LCA1NiwgMTZdIH0sCiAgICAgICAgInVwIjogeyAidXYiOiBbNDgsIDgsIDQwLCAwXSB9LAogICAgICAgICJkb3duIjogeyAidXYiOiBbNTYsIDAsIDQ4LCA4XSB9CiAgICAgIH0sCiAgICAgICJ0eXBlIjogImN1YmUiLAogICAgICAidXVpZCI6ICJkM2I1MWQwNi1iM2UzLTZiN2YtZDlkZS0xODUwMGRiY2UxNzUiCiAgICB9LAogICAgewogICAgICAibmFtZSI6ICJsZWZ0QXJtIiwKICAgICAgImZyb20iOiBbLTgsIDEyLCAtMl0sCiAgICAgICJ0byI6IFstNCwgMjQsIDJdLAogICAgICAidXZfb2Zmc2V0IjogWzMyLCA0OF0sCiAgICAgICJmYWNlcyI6IHsKICAgICAgICAibm9ydGgiOiB7ICJ1diI6IFszNiwgNTIsIDQwLCA2NF0gfSwKICAgICAgICAiZWFzdCI6IHsgInV2IjogWzMyLCA1MiwgMzYsIDY0XSB9LAogICAgICAgICJzb3V0aCI6IHsgInV2IjogWzQ0LCA1MiwgNDgsIDY0XSB9LAogICAgICAgICJ3ZXN0IjogeyAidXYiOiBbNDAsIDUyLCA0NCwgNjRdIH0sCiAgICAgICAgInVwIjogeyAidXYiOiBbNDAsIDUyLCAzNiwgNDhdIH0sCiAgICAgICAgImRvd24iOiB7ICJ1diI6IFs0NCwgNDgsIDQwLCA1Ml0gfQogICAgICB9LAogICAgICAidHlwZSI6ICJjdWJlIiwKICAgICAgInV1aWQiOiAiY2Q5ZDc5MTctNmQyMC04ZTk4LTBkZDgtZGI4MDdiOTc1Mzg3IgogICAgfSwKICAgIHsKICAgICAgIm5hbWUiOiAibGVmdFNsZWV2ZSIsCiAgICAgICJmcm9tIjogWy04LCAxMiwgLTJdLAogICAgICAidG8iOiBbLTQsIDI0LCAyXSwKICAgICAgImluZmxhdGUiOiAwLjI1LAogICAgICAidXZfb2Zmc2V0IjogWzQ4LCA0OF0sCiAgICAgICJmYWNlcyI6IHsKICAgICAgICAibm9ydGgiOiB7ICJ1diI6IFs1MiwgNTIsIDU2LCA2NF0gfSwKICAgICAgICAiZWFzdCI6IHsgInV2IjogWzQ4LCA1MiwgNTIsIDY0XSB9LAogICAgICAgICJzb3V0aCI6IHsgInV2IjogWzYwLCA1MiwgNjQsIDY0XSB9LAogICAgICAgICJ3ZXN0IjogeyAidXYiOiBbNTYsIDUyLCA2MCwgNjRdIH0sCiAgICAgICAgInVwIjogeyAidXYiOiBbNTYsIDUyLCA1MiwgNDhdIH0sCiAgICAgICAgImRvd24iOiB7ICJ1diI6IFs2MCwgNDgsIDU2LCA1Ml0gfQogICAgICB9LAogICAgICAidHlwZSI6ICJjdWJlIiwKICAgICAgInV1aWQiOiAiNWFiMWM3YjUtOGMyMC01ZTc0LTUzOTQtY2VlYWU4NjM3MjQzIgogICAgfSwKICAgIHsKICAgICAgIm5hbWUiOiAicmlnaHRBcm0iLAogICAgICAiZnJvbSI6IFs0LCAxMiwgLTJdLAogICAgICAidG8iOiBbOCwgMjQsIDJdLAogICAgICAidXZfb2Zmc2V0IjogWzQwLCAxNl0sCiAgICAgICJmYWNlcyI6IHsKICAgICAgICAibm9ydGgiOiB7ICJ1diI6IFs0NCwgMjAsIDQ4LCAzMl0gfSwKICAgICAgICAiZWFzdCI6IHsgInV2IjogWzQwLCAyMCwgNDQsIDMyXSB9LAogICAgICAgICJzb3V0aCI6IHsgInV2IjogWzUyLCAyMCwgNTYsIDMyXSB9LAogICAgICAgICJ3ZXN0IjogeyAidXYiOiBbNDgsIDIwLCA1MiwgMzJdIH0sCiAgICAgICAgInVwIjogeyAidXYiOiBbNDgsIDIwLCA0NCwgMTZdIH0sCiAgICAgICAgImRvd24iOiB7ICJ1diI6IFs1MiwgMTYsIDQ4LCAyMF0gfQogICAgICB9LAogICAgICAidHlwZSI6ICJjdWJlIiwKICAgICAgInV1aWQiOiAiMmUwNzZmMDMtZWJjYS1mODJiLTBhOTYtNTc1NWM0MWE2OTZhIgogICAgfSwKICAgIHsKICAgICAgIm5hbWUiOiAicmlnaHRTbGVldmUiLAogICAgICAiZnJvbSI6IFs0LCAxMiwgLTJdLAogICAgICAidG8iOiBbOCwgMjQsIDJdLAogICAgICAiaW5mbGF0ZSI6IDAuMjUsCiAgICAgICJ1dl9vZmZzZXQiOiBbNDAsIDMyXSwKICAgICAgImZhY2VzIjogewogICAgICAgICJub3J0aCI6IHsgInV2IjogWzQ0LCAzNiwgNDgsIDQ4XSB9LAogICAgICAgICJlYXN0IjogeyAidXYiOiBbNDAsIDM2LCA0NCwgNDhdIH0sCiAgICAgICAgInNvdXRoIjogeyAidXYiOiBbNTIsIDM2LCA1NiwgNDhdIH0sCiAgICAgICAgIndlc3QiOiB7ICJ1diI6IFs0OCwgMzYsIDUyLCA0OF0gfSwKICAgICAgICAidXAiOiB7ICJ1diI6IFs0OCwgMzYsIDQ0LCAzMl0gfSwKICAgICAgICAiZG93biI6IHsgInV2IjogWzUyLCAzMiwgNDgsIDM2XSB9CiAgICAgIH0sCiAgICAgICJ0eXBlIjogImN1YmUiLAogICAgICAidXVpZCI6ICJkNGY4Y2Q0ZS1lMWFjLWVhMDgtN2NlZS0zMzA4N2MxODM3ZjAiCiAgICB9LAogICAgewogICAgICAibmFtZSI6ICJsZWZ0TGVnIiwKICAgICAgImZyb20iOiBbLTMuOSwgMCwgLTJdLAogICAgICAidG8iOiBbMC4xLCAxMiwgMl0sCiAgICAgICJ1dl9vZmZzZXQiOiBbMTYsIDQ4XSwKICAgICAgImZhY2VzIjogewogICAgICAgICJub3J0aCI6IHsgInV2IjogWzIwLCA1MiwgMjQsIDY0XSB9LAogICAgICAgICJlYXN0IjogeyAidXYiOiBbMTYsIDUyLCAyMCwgNjRdIH0sCiAgICAgICAgInNvdXRoIjogeyAidXYiOiBbMjgsIDUyLCAzMiwgNjRdIH0sCiAgICAgICAgIndlc3QiOiB7ICJ1diI6IFsyNCwgNTIsIDI4LCA2NF0gfSwKICAgICAgICAidXAiOiB7ICJ1diI6IFsyNCwgNTIsIDIwLCA0OF0gfSwKICAgICAgICAiZG93biI6IHsgInV2IjogWzI4LCA0OCwgMjQsIDUyXSB9CiAgICAgIH0sCiAgICAgICJ0eXBlIjogImN1YmUiLAogICAgICAidXVpZCI6ICI2YjU4M2VkZS1mYmIyLTU4NjUtZmE5ZS0xMmUwOWEzZTQ0MjIiCiAgICB9LAogICAgewogICAgICAibmFtZSI6ICJsZWZ0UGFudHMiLAogICAgICAiZnJvbSI6IFstMy45LCAwLCAtMl0sCiAgICAgICJ0byI6IFswLjEsIDEyLCAyXSwKICAgICAgImluZmxhdGUiOiAwLjI1LAogICAgICAidXZfb2Zmc2V0IjogWzAsIDQ4XSwKICAgICAgImZhY2VzIjogewogICAgICAgICJub3J0aCI6IHsgInV2IjogWzQsIDUyLCA4LCA2NF0gfSwKICAgICAgICAiZWFzdCI6IHsgInV2IjogWzAsIDUyLCA0LCA2NF0gfSwKICAgICAgICAic291dGgiOiB7ICJ1diI6IFsxMiwgNTIsIDE2LCA2NF0gfSwKICAgICAgICAid2VzdCI6IHsgInV2IjogWzgsIDUyLCAxMiwgNjRdIH0sCiAgICAgICAgInVwIjogeyAidXYiOiBbOCwgNTIsIDQsIDQ4XSB9LAogICAgICAgICJkb3duIjogeyAidXYiOiBbMTIsIDQ4LCA4LCA1Ml0gfQogICAgICB9LAogICAgICAidHlwZSI6ICJjdWJlIiwKICAgICAgInV1aWQiOiAiMTM3NzEzNmYtNjhiYi1kYTIwLTY1OTItNDEwOTJjMTlhYjE4IgogICAgfSwKICAgIHsKICAgICAgIm5hbWUiOiAicmlnaHRMZWciLAogICAgICAiZnJvbSI6IFstMC4xLCAwLCAtMl0sCiAgICAgICJ0byI6IFszLjksIDEyLCAyXSwKICAgICAgInV2X29mZnNldCI6IFswLCAxNl0sCiAgICAgICJmYWNlcyI6IHsKICAgICAgICAibm9ydGgiOiB7ICJ1diI6IFs0LCAyMCwgOCwgMzJdIH0sCiAgICAgICAgImVhc3QiOiB7ICJ1diI6IFswLCAyMCwgNCwgMzJdIH0sCiAgICAgICAgInNvdXRoIjogeyAidXYiOiBbMTIsIDIwLCAxNiwgMzJdIH0sCiAgICAgICAgIndlc3QiOiB7ICJ1diI6IFs4LCAyMCwgMTIsIDMyXSB9LAogICAgICAgICJ1cCI6IHsgInV2IjogWzgsIDIwLCA0LCAxNl0gfSwKICAgICAgICAiZG93biI6IHsgInV2IjogWzEyLCAxNiwgOCwgMjBdIH0KICAgICAgfSwKICAgICAgInR5cGUiOiAiY3ViZSIsCiAgICAgICJ1dWlkIjogImUxNzFhMzE0LWYyZDEtYTk5OC05OThjLWQ1ZmYwNTljZjQ3ZSIKICAgIH0sCiAgICB7CiAgICAgICJuYW1lIjogInJpZ2h0UGFudHMiLAogICAgICAiZnJvbSI6IFstMC4xLCAwLCAtMl0sCiAgICAgICJ0byI6IFszLjksIDEyLCAyXSwKICAgICAgImluZmxhdGUiOiAwLjI1LAogICAgICAidXZfb2Zmc2V0IjogWzAsIDMyXSwKICAgICAgImZhY2VzIjogewogICAgICAgICJub3J0aCI6IHsgInV2IjogWzQsIDM2LCA4LCA0OF0gfSwKICAgICAgICAiZWFzdCI6IHsgInV2IjogWzAsIDM2LCA0LCA0OF0gfSwKICAgICAgICAic291dGgiOiB7ICJ1diI6IFsxMiwgMzYsIDE2LCA0OF0gfSwKICAgICAgICAid2VzdCI6IHsgInV2IjogWzgsIDM2LCAxMiwgNDhdIH0sCiAgICAgICAgInVwIjogeyAidXYiOiBbOCwgMzYsIDQsIDMyXSB9LAogICAgICAgICJkb3duIjogeyAidXYiOiBbMTIsIDMyLCA4LCAzNl0gfQogICAgICB9LAogICAgICAidHlwZSI6ICJjdWJlIiwKICAgICAgInV1aWQiOiAiODZjYmExMGEtYjhmYy00MWQzLTMwMjQtODgzNDU0YmZjMTQ2IgogICAgfSwKICAgIHsKICAgICAgIm5hbWUiOiAiamFja2V0IiwKICAgICAgImZyb20iOiBbLTQsIDEyLCAtMl0sCiAgICAgICJ0byI6IFs0LCAyNCwgMl0sCiAgICAgICJpbmZsYXRlIjogMC4yNSwKICAgICAgInV2X29mZnNldCI6IFsxNiwgMzJdLAogICAgICAiZmFjZXMiOiB7CiAgICAgICAgIm5vcnRoIjogeyAidXYiOiBbMjAsIDM2LCAyOCwgNDhdIH0sCiAgICAgICAgImVhc3QiOiB7ICJ1diI6IFsxNiwgMzYsIDIwLCA0OF0gfSwKICAgICAgICAic291dGgiOiB7ICJ1diI6IFszMiwgMzYsIDQwLCA0OF0gfSwKICAgICAgICAid2VzdCI6IHsgInV2IjogWzI4LCAzNiwgMzIsIDQ4XSB9LAogICAgICAgICJ1cCI6IHsgInV2IjogWzI4LCAzNiwgMjAsIDMyXSB9LAogICAgICAgICJkb3duIjogeyAidXYiOiBbMzYsIDMyLCAyOCwgMzZdIH0KICAgICAgfSwKICAgICAgInR5cGUiOiAiY3ViZSIsCiAgICAgICJ1dWlkIjogIjJiYjkyZTAzLTU4ZjktNWU1Ny04YWZkLTEwMjI4Yjc3NmZmMyIKICAgIH0KICBdLAogICJvdXRsaW5lciI6IFsKICAgIHsKICAgICAgInV1aWQiOiAiZDNiMWVlMmItMTJiNy0yYjdkLTgzMjEtNTcwNzQzNjEzMWE5IiwKICAgICAgImNoaWxkcmVuIjogWwogICAgICAgIHsKICAgICAgICAgICJ1dWlkIjogImE2ZTc5ZWRiLTY1MTMtYjI5OC1mYjdmLTM3MmZkMzFkZWExMyIsCiAgICAgICAgICAiY2hpbGRyZW4iOiBbImI2NTQzZjYyLTMxYTktMWViNS1iOTRmLWMwOWI5ZjBmNmJjNCIsICJkM2I1MWQwNi1iM2UzLTZiN2YtZDlkZS0xODUwMGRiY2UxNzUiXQogICAgICAgIH0sCiAgICAgICAgewogICAgICAgICAgInV1aWQiOiAiMDhhYTk2Y2EtY2UwOS01NDEzLWEzYmItZWZiM2QzY2MyMTVjIiwKICAgICAgICAgICJjaGlsZHJlbiI6IFsiZWQ3NmU0NGItMGU5YS1lZmMwLWFkZGQtODc1MzFkNWMyNjM3IiwgIjJiYjkyZTAzLTU4ZjktNWU1Ny04YWZkLTEwMjI4Yjc3NmZmMyJdCiAgICAgICAgfSwKICAgICAgICB7CiAgICAgICAgICAidXVpZCI6ICJkZGEyYzkxMy01Y2E1LTgwNDItZjkzYS1mYjc5OWY0NWY0NDciLAogICAgICAgICAgImNoaWxkcmVuIjogWyJjZDlkNzkxNy02ZDIwLThlOTgtMGRkOC1kYjgwN2I5NzUzODciLCAiNWFiMWM3YjUtOGMyMC01ZTc0LTUzOTQtY2VlYWU4NjM3MjQzIl0KICAgICAgICB9LAogICAgICAgIHsKICAgICAgICAgICJ1dWlkIjogIjY4OTU1NDlhLTMyMGEtYzc1Mi00ODhiLWMyNGMyYzhhNDZiMyIsCiAgICAgICAgICAiY2hpbGRyZW4iOiBbIjJlMDc2ZjAzLWViY2EtZjgyYi0wYTk2LTU3NTVjNDFhNjk2YSIsICJkNGY4Y2Q0ZS1lMWFjLWVhMDgtN2NlZS0zMzA4N2MxODM3ZjAiXQogICAgICAgIH0sCiAgICAgICAgewogICAgICAgICAgInV1aWQiOiAiNjI4MDU2OGMtMjJkNy1lYTYzLWJhOWMtMzkwMWIyMTQ5YWJlIiwKICAgICAgICAgICJjaGlsZHJlbiI6IFsiNmI1ODNlZGUtZmJiMi01ODY1LWZhOWUtMTJlMDlhM2U0NDIyIiwgIjEzNzcxMzZmLTY4YmItZGEyMC02NTkyLTQxMDkyYzE5YWIxOCJdCiAgICAgICAgfSwKICAgICAgICB7CiAgICAgICAgICAidXVpZCI6ICI3OWU2NTAwMi0wYzdmLTAyODctNDYwYy1hZTdmNDQ1ZTZhMTEiLAogICAgICAgICAgImNoaWxkcmVuIjogWyJlMTcxYTMxNC1mMmQxLWE5OTgtOTk4Yy1kNWZmMDU5Y2Y0N2UiLCAiODZjYmExMGEtYjhmYy00MWQzLTMwMjQtODgzNDU0YmZjMTQ2Il0KICAgICAgICB9CiAgICAgIF0KICAgIH0KICBdLAogICJ0ZXh0dXJlcyI6IFtdCn0=";

// ============================================================
// 5. Player Skin Loader (使用 minotar.net - 支持 CORS)
// ============================================================

$(function() {

    const $playerName = $('#playerName');
    const $loadSkinBtn = $('#loadSkin');
    const $statusMsg = $('#statusMsg');

    function loadPlayerSkin(username) {
        $statusMsg.text('Loading skin for ' + username + '...').css('color', '#888');

        // 使用 minotar.net 直接获取皮肤（支持 CORS）
        var skinUrl = 'https://minotar.net/skin/' + encodeURIComponent(username);

        var skinImg = new Image();
        skinImg.crossOrigin = 'Anonymous';
        skinImg.onload = function() {
            // minotar 返回 8x8 的默认皮肤时说明玩家不存在
            // 检查是否是默认皮肤（8x8）
            if (skinImg.width === 8 && skinImg.height === 8) {
                $statusMsg.text('❌ Player "' + username + '" does not exist or has no custom skin!').css('color', '#e74c3c');
                return;
            }
            applySkinTexture(skinImg);
            $statusMsg.text('✅ Skin loaded for ' + username + '!').css('color', '#27ae60');

            var avatarImg = document.getElementById('playerAvatar');
            if (avatarImg) {
                avatarImg.src = 'https://minotar.net/avatar/' + encodeURIComponent(username) + '/48';
                avatarImg.style.display = 'inline-block';
            }
        };
        skinImg.onerror = function() {
            // 备用：尝试 mc-heads.net
            $statusMsg.text('Trying alternative...').css('color', '#888');
            loadSkinViaMinecraftHeads(username);
        };
        skinImg.src = skinUrl;
    }

    // 备用方案1：mc-heads.net
    function loadSkinViaMinecraftHeads(username) {
        var skinUrl = 'https://mc-heads.net/skin/' + encodeURIComponent(username);

        var skinImg = new Image();
        skinImg.crossOrigin = 'Anonymous';
        skinImg.onload = function() {
            // mc-heads 返回 64x64 的 Steve 皮肤时说明玩家不存在
            // 简单判断：如果图片是 64x64 且是默认 Steve，视为不存在
            applySkinTexture(skinImg);
            $statusMsg.text('✅ Skin loaded for ' + username + '!').css('color', '#27ae60');

            var avatarImg = document.getElementById('playerAvatar');
            if (avatarImg) {
                avatarImg.src = 'https://mc-heads.net/avatar/' + encodeURIComponent(username) + '/48';
                avatarImg.style.display = 'inline-block';
            }
        };
        skinImg.onerror = function() {
            // 备用方案2：通过 UUID 获取
            $statusMsg.text('Trying fallback...').css('color', '#888');
            loadSkinViaUUID(username);
        };
        skinImg.src = skinUrl;
    }

    // 备用方案2：通过 UUID 获取（使用 minetools）
    function loadSkinViaUUID(username) {
        $.getJSON('https://api.minetools.eu/uuid/' + username)
            .done(function(data) {
                if (!data || !data.id) {
                    $statusMsg.text('❌ Player "' + username + '" does not exist!').css('color', '#e74c3c');
                    return;
                }

                var uuid = data.id.replace(/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/, '$1-$2-$3-$4-$5');
                var cleanUuid = uuid.replace(/-/g, '');
                
                // 使用多种皮肤服务
                var skinUrls = [
                    'https://crafatar.com/skins/' + cleanUuid,
                    'https://minotar.net/skin/' + cleanUuid,
                    'https://mc-heads.net/skin/' + cleanUuid
                ];

                tryNextSkin(skinUrls, 0, username, cleanUuid);
            })
            .fail(function() {
                $statusMsg.text('❌ Player "' + username + '" does not exist!').css('color', '#e74c3c');
            });
    }

    function tryNextSkin(urls, index, username, uuid) {
        if (index >= urls.length) {
            $statusMsg.text('❌ Failed to load skin for "' + username + '"').css('color', '#e74c3c');
            return;
        }

        var skinImg = new Image();
        skinImg.crossOrigin = 'Anonymous';
        skinImg.onload = function() {
            applySkinTexture(skinImg);
            $statusMsg.text('✅ Skin loaded for ' + username + '!').css('color', '#27ae60');

            var avatarImg = document.getElementById('playerAvatar');
            if (avatarImg && uuid) {
                avatarImg.src = 'https://crafatar.com/avatars/' + uuid + '?size=48&overlay';
                avatarImg.style.display = 'inline-block';
            }
        };
        skinImg.onerror = function() {
            tryNextSkin(urls, index + 1, username, uuid);
        };
        skinImg.src = urls[index];
    }

    function applySkinTexture(skinImg) {
        var canvas = createCanvas(64, 64);
        canvas.context.drawImage(skinImg, 0, 0, 64, 64);

        if (loader && loader.materials && loader.materials[0]) {
            loader.materials[0].map.image = canvas.canvas;
            loader.materials[0].map.needsUpdate = true;

            if (loader.materials[1]) {
                var material2 = loader.materials[0].clone();
                createAlphaMap(canvas.canvas, 1, BBModelLoader.alphaByAlpha).then(function(alphaMap) {
                    material2.alphaMap = alphaMap;
                    material2.transparent = true;
                    loader.materials[1] = material2;

                    Object.keys(loader.parts).forEach(function(key) {
                        var mesh = loader.parts[key].children[1].children[0];
                        if (mesh) {
                            mesh.material = loader.materials;
                        }
                    });
                });
            }

            texture_changed = true;

            var thumbCanvas = document.querySelector('#thumb canvas');
            if (thumbCanvas) {
                var ctx = thumbCanvas.getContext('2d');
                ctx.clearRect(0, 0, 64, 64);
                ctx.drawImage(skinImg, 0, 0, 64, 64);
            }
        } else {
            $statusMsg.text('⚠️ Model not loaded yet, please wait.').css('color', '#f39c12');
        }
    }

    $loadSkinBtn.on('click', function() {
        var name = $playerName.val().trim();
        if (!name) {
            $statusMsg.text('⚠️ Please enter a player name!').css('color', '#f39c12');
            return;
        }
        loadPlayerSkin(name);
    });

    $playerName.on('keydown', function(e) {
        if (e.key === 'Enter') {
            $loadSkinBtn.click();
        }
    });

    if (!$playerName.val()) {
        $playerName.val('Steve');
    }

    console.log('✅ Skin loader ready!');
});
