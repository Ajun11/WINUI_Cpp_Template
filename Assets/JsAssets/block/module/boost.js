!/**
 * Highcharts JS v12.0.1 (2024-11-28)
 * @module highcharts/modules/boost
 * @requires highcharts
 *
 * Boost module
 *
 * (c) 2010-2024 Highsoft AS
 * Author: Torstein Honsi
 *
 * License: www.highcharts.com/license
 *
 * */function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t(require("highcharts"), require("highcharts").Color) : "function" == typeof define && define.amd ? define("highcharts/boost", [["highcharts/highcharts"], ["highcharts/highcharts", "Color"]], t) : "object" == typeof exports ? exports["highcharts/boost"] = t(require("highcharts"), require("highcharts").Color) : e.Highcharts = t(e.Highcharts, e.Highcharts.Color)
}(this, (e, t) => (() => {
    "use strict";
    let i, r;
    var s = {
        620: e => {
            e.exports = t
        }, 944: t => {
            t.exports = e
        }
    }, o = {};

    function n(e) {
        var t = o[e];
        if (void 0 !== t) return t.exports;
        var i = o[e] = {exports: {}};
        return s[e](i, i.exports, n), i.exports
    }

    n.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return n.d(t, {a: t}), t
    }, n.d = (e, t) => {
        for (var i in t) n.o(t, i) && !n.o(e, i) && Object.defineProperty(e, i, {enumerable: !0, get: t[i]})
    }, n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
    var a = {};
    n.d(a, {default: () => eU});
    var l = n(944), h =/*#__PURE__*/n.n(l);
    let d = ["area", "areaspline", "arearange", "column", "columnrange", "bar", "line", "scatter", "heatmap", "bubble", "treemap"],
        f = {};
    d.forEach(e => {
        f[e] = !0
    });
    let {composed: u} = h(), {addEvent: g, pick: m, pushUnique: c} = h();

    function p(e) {
        let t = e.series, i = e.boost = e.boost || {}, r = e.options.boost || {}, s = m(r.seriesThreshold, 50);
        if (t.length >= s) return !0;
        if (1 === t.length) return !1;
        let o = r.allowForce;
        if (void 0 === o) {
            for (let t of (o = !0, e.xAxis)) if (m(t.min, -1 / 0) > m(t.dataMin, -1 / 0) || m(t.max, 1 / 0) < m(t.dataMax, 1 / 0)) {
                o = !1;
                break
            }
        }
        if (void 0 !== i.forceChartBoost) {
            if (o) return i.forceChartBoost;
            i.forceChartBoost = void 0
        }
        let n = 0, a = 0, l;
        for (let e of t) 0 !== (l = e.options).boostThreshold && !1 !== e.visible && "heatmap" !== e.type && (f[e.type] && ++n, function (...e) {
            let t = -Number.MAX_VALUE;
            return e.forEach(e => {
                if (null != e && void 0 !== e.length && e.length > 0) return t = e.length, !0
            }), t
        }(e.getColumn("x", !0), l.data, e.points) >= (l.boostThreshold || Number.MAX_VALUE) && ++a);
        return i.forceChartBoost = o && (n === t.length && a === n || a > 5), i.forceChartBoost
    }

    function b(e) {
        function t() {
            e.boost && e.boost.wgl && p(e) && e.boost.wgl.render(e)
        }

        g(e, "predraw", function () {
            e.boost = e.boost || {}, e.boost.forceChartBoost = void 0, e.boosted = !1, e.axes.some(e => e.isPanning) || e.boost.clear?.(), e.boost.canvas && e.boost.wgl && p(e) && e.boost.wgl.allocateBuffer(e), e.boost.markerGroup && e.xAxis && e.xAxis.length > 0 && e.yAxis && e.yAxis.length > 0 && e.boost.markerGroup.translate(e.xAxis[0].pos, e.yAxis[0].pos)
        }), g(e, "load", t, {order: -1}), g(e, "redraw", t);
        let i = -1, r = -1;
        g(e.pointer, "afterGetHoverData", t => {
            let s = t.hoverPoint?.series;
            if (e.boost = e.boost || {}, e.boost.markerGroup && s) {
                let t = e.inverted ? s.yAxis : s.xAxis, o = e.inverted ? s.xAxis : s.yAxis;
                (t && t.pos !== i || o && o.pos !== r) && (e.series.forEach(e => {
                    e.halo?.hide()
                }), e.boost.markerGroup.translate(t.pos, o.pos), i = t.pos, r = o.pos)
            }
        })
    }

    let x = {
        compose: function (e, t) {
            return t && c(u, "Boost.Chart") && e.prototype.callbacks.push(b), e
        }, getBoostClipRect: function (e, t) {
            let i = e.navigator, r = {x: e.plotLeft, y: e.plotTop, width: e.plotWidth, height: e.plotHeight};
            if (i && e.inverted ? (r.width += i.top + i.height, i.opposite || (r.x = i.left)) : i && !e.inverted && (r.height = i.top + i.height - e.plotTop), t.getClipBox) {
                let {xAxis: i, yAxis: s} = t;
                if (r = t.getClipBox(), e.inverted) {
                    let e = r.width;
                    r.width = r.height, r.height = e, r.x = s.pos, r.y = i.pos
                } else r.x = i.pos, r.y = s.pos
            }
            if (t === e) {
                let t = e.inverted ? e.xAxis : e.yAxis;
                t.length <= 1 && (r.y = Math.min(t[0].pos, r.y), r.height = t[0].pos - e.plotTop + t[0].len)
            }
            return r
        }, isChartSeriesBoosting: p
    };
    var A = n(620), y =/*#__PURE__*/n.n(A);
    let v = {
            area: "LINES",
            arearange: "LINES",
            areaspline: "LINES",
            column: "LINES",
            columnrange: "LINES",
            bar: "LINES",
            line: "LINE_STRIP",
            scatter: "POINTS",
            heatmap: "TRIANGLES",
            treemap: "TRIANGLES",
            bubble: "POINTS"
        }, {clamp: P, error: T, pick: C} = h(), k = class {
            constructor(e) {
                if (this.errors = [], this.uLocations = {}, this.gl = e, e && !this.createShader()) return
            }

            bind() {
                this.gl && this.shaderProgram && this.gl.useProgram(this.shaderProgram)
            }

            createShader() {
                let e = this.stringToProgram("#version 100\n#define LN10 2.302585092994046\nprecision highp float;\nattribute vec4 aVertexPosition;\nattribute vec4 aColor;\nvarying highp vec2 position;\nvarying highp vec4 vColor;\nuniform mat4 uPMatrix;\nuniform float pSize;\nuniform float translatedThreshold;\nuniform bool hasThreshold;\nuniform bool skipTranslation;\nuniform float xAxisTrans;\nuniform float xAxisMin;\nuniform float xAxisMinPad;\nuniform float xAxisPointRange;\nuniform float xAxisLen;\nuniform bool  xAxisPostTranslate;\nuniform float xAxisOrdinalSlope;\nuniform float xAxisOrdinalOffset;\nuniform float xAxisPos;\nuniform bool  xAxisCVSCoord;\nuniform bool  xAxisIsLog;\nuniform bool  xAxisReversed;\nuniform float yAxisTrans;\nuniform float yAxisMin;\nuniform float yAxisMinPad;\nuniform float yAxisPointRange;\nuniform float yAxisLen;\nuniform bool  yAxisPostTranslate;\nuniform float yAxisOrdinalSlope;\nuniform float yAxisOrdinalOffset;\nuniform float yAxisPos;\nuniform bool  yAxisCVSCoord;\nuniform bool  yAxisIsLog;\nuniform bool  yAxisReversed;\nuniform bool  isBubble;\nuniform bool  bubbleSizeByArea;\nuniform float bubbleZMin;\nuniform float bubbleZMax;\nuniform float bubbleZThreshold;\nuniform float bubbleMinSize;\nuniform float bubbleMaxSize;\nuniform bool  bubbleSizeAbs;\nuniform bool  isInverted;\nfloat bubbleRadius(){\nfloat value = aVertexPosition.w;\nfloat zMax = bubbleZMax;\nfloat zMin = bubbleZMin;\nfloat radius = 0.0;\nfloat pos = 0.0;\nfloat zRange = zMax - zMin;\nif (bubbleSizeAbs){\nvalue = value - bubbleZThreshold;\nzMax = max(zMax - bubbleZThreshold, zMin - bubbleZThreshold);\nzMin = 0.0;\n}\nif (value < zMin){\nradius = bubbleZMin / 2.0 - 1.0;\n} else {\npos = zRange > 0.0 ? (value - zMin) / zRange : 0.5;\nif (bubbleSizeByArea && pos > 0.0){\npos = sqrt(pos);\n}\nradius = ceil(bubbleMinSize + pos * (bubbleMaxSize - bubbleMinSize)) / 2.0;\n}\nreturn radius * 2.0;\n}\nfloat translate(float val,\nfloat pointPlacement,\nfloat localA,\nfloat localMin,\nfloat minPixelPadding,\nfloat pointRange,\nfloat len,\nbool  cvsCoord,\nbool  isLog,\nbool  reversed\n){\nfloat sign = 1.0;\nfloat cvsOffset = 0.0;\nif (cvsCoord) {\nsign *= -1.0;\ncvsOffset = len;\n}\nif (isLog) {\nval = log(val) / LN10;\n}\nif (reversed) {\nsign *= -1.0;\ncvsOffset -= sign * len;\n}\nreturn sign * (val - localMin) * localA + cvsOffset + \n(sign * minPixelPadding);\n}\nfloat xToPixels(float value) {\nif (skipTranslation){\nreturn value;// + xAxisPos;\n}\nreturn translate(value, 0.0, xAxisTrans, xAxisMin, xAxisMinPad, xAxisPointRange, xAxisLen, xAxisCVSCoord, xAxisIsLog, xAxisReversed);// + xAxisPos;\n}\nfloat yToPixels(float value, float checkTreshold) {\nfloat v;\nif (skipTranslation){\nv = value;// + yAxisPos;\n} else {\nv = translate(value, 0.0, yAxisTrans, yAxisMin, yAxisMinPad, yAxisPointRange, yAxisLen, yAxisCVSCoord, yAxisIsLog, yAxisReversed);// + yAxisPos;\nif (v > yAxisLen) {\nv = yAxisLen;\n}\n}\nif (checkTreshold > 0.0 && hasThreshold) {\nv = min(v, translatedThreshold);\n}\nreturn v;\n}\nvoid main(void) {\nif (isBubble){\ngl_PointSize = bubbleRadius();\n} else {\ngl_PointSize = pSize;\n}\nvColor = aColor;\nif (skipTranslation && isInverted) {\ngl_Position = uPMatrix * vec4(aVertexPosition.y + yAxisPos, aVertexPosition.x + xAxisPos, 0.0, 1.0);\n} else if (isInverted) {\ngl_Position = uPMatrix * vec4(yToPixels(aVertexPosition.y, aVertexPosition.z) + yAxisPos, xToPixels(aVertexPosition.x) + xAxisPos, 0.0, 1.0);\n} else {\ngl_Position = uPMatrix * vec4(xToPixels(aVertexPosition.x) + xAxisPos, yToPixels(aVertexPosition.y, aVertexPosition.z) + yAxisPos, 0.0, 1.0);\n}\n}", "vertex"),
                    t = this.stringToProgram("precision highp float;\nuniform vec4 fillColor;\nvarying highp vec2 position;\nvarying highp vec4 vColor;\nuniform sampler2D uSampler;\nuniform bool isCircle;\nuniform bool hasColor;\nvoid main(void) {\nvec4 col = fillColor;\nvec4 tcol = texture2D(uSampler, gl_PointCoord.st);\nif (hasColor) {\ncol = vColor;\n}\nif (isCircle) {\ncol *= tcol;\nif (tcol.r < 0.0) {\ndiscard;\n} else {\ngl_FragColor = col;\n}\n} else {\ngl_FragColor = col;\n}\n}", "fragment"),
                    i = e => this.gl.getUniformLocation(this.shaderProgram, e);
                return e && t ? (this.shaderProgram = this.gl.createProgram(), this.gl.attachShader(this.shaderProgram, e), this.gl.attachShader(this.shaderProgram, t), this.gl.linkProgram(this.shaderProgram), this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) ? (this.gl.useProgram(this.shaderProgram), this.gl.bindAttribLocation(this.shaderProgram, 0, "aVertexPosition"), this.pUniform = i("uPMatrix"), this.psUniform = i("pSize"), this.fcUniform = i("fillColor"), this.isBubbleUniform = i("isBubble"), this.bubbleSizeAbsUniform = i("bubbleSizeAbs"), this.bubbleSizeAreaUniform = i("bubbleSizeByArea"), this.uSamplerUniform = i("uSampler"), this.skipTranslationUniform = i("skipTranslation"), this.isCircleUniform = i("isCircle"), this.isInverted = i("isInverted"), !0) : (this.errors.push(this.gl.getProgramInfoLog(this.shaderProgram)), this.handleErrors(), this.shaderProgram = !1, !1) : (this.shaderProgram = !1, this.handleErrors(), !1)
            }

            handleErrors() {
                this.errors.length && T("[highcharts boost] shader error - " + this.errors.join("\n"))
            }

            stringToProgram(e, t) {
                let i = this.gl.createShader("vertex" === t ? this.gl.VERTEX_SHADER : this.gl.FRAGMENT_SHADER);
                return (this.gl.shaderSource(i, e), this.gl.compileShader(i), this.gl.getShaderParameter(i, this.gl.COMPILE_STATUS)) ? i : (this.errors.push("when compiling " + t + " shader:\n" + this.gl.getShaderInfoLog(i)), !1)
            }

            destroy() {
                this.gl && this.shaderProgram && (this.gl.deleteProgram(this.shaderProgram), this.shaderProgram = !1)
            }

            fillColorUniform() {
                return this.fcUniform
            }

            getProgram() {
                return this.shaderProgram
            }

            pointSizeUniform() {
                return this.psUniform
            }

            perspectiveUniform() {
                return this.pUniform
            }

            reset() {
                this.gl && this.shaderProgram && (this.gl.uniform1i(this.isBubbleUniform, 0), this.gl.uniform1i(this.isCircleUniform, 0))
            }

            setBubbleUniforms(e, t, i, r = 1) {
                let s = e.options, o = Number.MAX_VALUE, n = -Number.MAX_VALUE;
                if (this.gl && this.shaderProgram && e.is("bubble")) {
                    let a = e.getPxExtremes();
                    o = C(s.zMin, P(t, !1 === s.displayNegative ? s.zThreshold : -Number.MAX_VALUE, o)), n = C(s.zMax, Math.max(n, i)), this.gl.uniform1i(this.isBubbleUniform, 1), this.gl.uniform1i(this.isCircleUniform, 1), this.gl.uniform1i(this.bubbleSizeAreaUniform, "width" !== e.options.sizeBy), this.gl.uniform1i(this.bubbleSizeAbsUniform, e.options.sizeByAbsoluteValue), this.setUniform("bubbleMinSize", a.minPxSize * r), this.setUniform("bubbleMaxSize", a.maxPxSize * r), this.setUniform("bubbleZMin", o), this.setUniform("bubbleZMax", n), this.setUniform("bubbleZThreshold", e.options.zThreshold)
                }
            }

            setColor(e) {
                this.gl && this.shaderProgram && this.gl.uniform4f(this.fcUniform, e[0] / 255, e[1] / 255, e[2] / 255, e[3])
            }

            setDrawAsCircle(e) {
                this.gl && this.shaderProgram && this.gl.uniform1i(this.isCircleUniform, e ? 1 : 0)
            }

            setInverted(e) {
                this.gl && this.shaderProgram && this.gl.uniform1i(this.isInverted, e)
            }

            setPMatrix(e) {
                this.gl && this.shaderProgram && this.gl.uniformMatrix4fv(this.pUniform, !1, e)
            }

            setPointSize(e) {
                this.gl && this.shaderProgram && this.gl.uniform1f(this.psUniform, e)
            }

            setSkipTranslation(e) {
                this.gl && this.shaderProgram && this.gl.uniform1i(this.skipTranslationUniform, !0 === e ? 1 : 0)
            }

            setTexture(e) {
                this.gl && this.shaderProgram && this.gl.uniform1i(this.uSamplerUniform, e)
            }

            setUniform(e, t) {
                if (this.gl && this.shaderProgram) {
                    let i = this.uLocations[e] = this.uLocations[e] || this.gl.getUniformLocation(this.shaderProgram, e);
                    this.gl.uniform1f(i, t)
                }
            }
        }, E = class {
            constructor(e, t, i) {
                this.buffer = !1, this.iterator = 0, this.preAllocated = !1, this.vertAttribute = !1, this.components = i || 2, this.dataComponents = i, this.gl = e, this.shader = t
            }

            allocate(e) {
                this.iterator = -1, this.preAllocated = new Float32Array(4 * e)
            }

            bind() {
                if (!this.buffer) return !1;
                this.gl.vertexAttribPointer(this.vertAttribute, this.components, this.gl.FLOAT, !1, 0, 0)
            }

            build(e, t, i) {
                let r;
                return (this.data = e || [], this.data && 0 !== this.data.length || this.preAllocated) ? (this.components = i || this.components, this.buffer && this.gl.deleteBuffer(this.buffer), this.preAllocated || (r = new Float32Array(this.data)), this.buffer = this.gl.createBuffer(), this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer), this.gl.bufferData(this.gl.ARRAY_BUFFER, this.preAllocated || r, this.gl.STATIC_DRAW), this.vertAttribute = this.gl.getAttribLocation(this.shader.getProgram(), t), this.gl.enableVertexAttribArray(this.vertAttribute), r = !1, !0) : (this.destroy(), !1)
            }

            destroy() {
                this.buffer && (this.gl.deleteBuffer(this.buffer), this.buffer = !1, this.vertAttribute = !1), this.iterator = 0, this.components = this.dataComponents || 2, this.data = []
            }

            push(e, t, i, r) {
                this.preAllocated && (this.preAllocated[++this.iterator] = e, this.preAllocated[++this.iterator] = t, this.preAllocated[++this.iterator] = i, this.preAllocated[++this.iterator] = r)
            }

            render(e, t, i) {
                let r = this.preAllocated ? this.preAllocated.length : this.data.length;
                return !!this.buffer && !!r && ((!e || e > r || e < 0) && (e = 0), (!t || t > r) && (t = r), !(e >= t) && (i = i || "POINTS", this.gl.drawArrays(this.gl[i], e / this.components, (t - e) / this.components), !0))
            }
        }, {parse: S} = y(), {doc: M, win: w} = h(), {isNumber: U, isObject: R, merge: L, objectEach: z, pick: _} = h(),
        N = {column: !0, columnrange: !0, bar: !0, area: !0, areaspline: !0, arearange: !0},
        D = {scatter: !0, bubble: !0}, G = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"];

    class I {
        constructor(e) {
            this.data = [], this.height = 0, this.isInited = !1, this.markerData = [], this.series = [], this.textureHandles = {}, this.width = 0, this.postRenderCallback = e, this.settings = {
                pointSize: 1,
                lineWidth: 1,
                fillColor: "#AA00AA",
                useAlpha: !0,
                usePreallocated: !1,
                useGPUTranslations: !1,
                debug: {
                    timeRendering: !1,
                    timeSeriesProcessing: !1,
                    timeSetup: !1,
                    timeBufferCopy: !1,
                    timeKDTree: !1,
                    showSkipSummary: !1
                }
            }
        }

        static orthoMatrix(e, t) {
            return [2 / e, 0, 0, 0, 0, -(2 / t), 0, 0, 0, 0, -2, 0, -1, 1, -1, 1]
        }

        static seriesPointCount(e) {
            let t, i, r;
            return e.boosted ? (t = !!e.options.stacking, i = (e.getColumn("x").length ? e.getColumn("x") : void 0) || e.options.xData || e.getColumn("x", !0), r = (t ? e.data : i || e.options.data).length, "treemap" === e.type ? r *= 12 : "heatmap" === e.type ? r *= 6 : N[e.type] && (r *= 2), r) : 0
        }

        getPixelRatio() {
            return this.settings.pixelRatio || w.devicePixelRatio || 1
        }

        setOptions(e) {
            "pixelRatio" in e || (e.pixelRatio = 1), L(!0, this.settings, e)
        }

        allocateBuffer(e) {
            let t = this.vbuffer, i = 0;
            this.settings.usePreallocated && (e.series.forEach(e => {
                e.boosted && (i += I.seriesPointCount(e))
            }), t && t.allocate(i))
        }

        allocateBufferForSingleSeries(e) {
            let t = this.vbuffer, i = 0;
            this.settings.usePreallocated && (e.boosted && (i = I.seriesPointCount(e)), t && t.allocate(i))
        }

        clear() {
            let e = this.gl;
            e && e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT)
        }

        pushSeriesData(e, t) {
            let i = this.data, r = this.settings, s = this.vbuffer,
                o = e.pointArrayMap && "low,high" === e.pointArrayMap.join(","), {
                    chart: n,
                    options: a,
                    sorted: l,
                    xAxis: h,
                    yAxis: d
                } = e, f = !!a.stacking, u = a.data, g = e.xAxis.getExtremes(), m = g.min - (e.xAxis.minPointOffset || 0),
                c = g.max + (e.xAxis.minPointOffset || 0), p = e.yAxis.getExtremes(),
                b = p.min - (e.yAxis.minPointOffset || 0), x = p.max + (e.yAxis.minPointOffset || 0),
                A = (e.getColumn("x").length ? e.getColumn("x") : void 0) || a.xData || e.getColumn("x", !0),
                y = (e.getColumn("y").length ? e.getColumn("y") : void 0) || a.yData || e.getColumn("y", !0),
                v = (e.getColumn("z").length ? e.getColumn("z") : void 0) || a.zData || e.getColumn("z", !0),
                P = !A || 0 === A.length, T = a.connectNulls, C = e.points || !1, k = f ? e.data : A || u,
                E = {x: Number.MAX_VALUE, y: 0}, M = {x: -Number.MAX_VALUE, y: 0}, w = void 0 === n.index,
                U = N[e.type], L = a.zoneAxis || "y", z = a.zones || !1, _ = a.threshold, D = this.getPixelRatio(),
                G = e.chart.plotWidth, I = !1, B = !1, O, V, X = 0, F = !1, H, q, W, Y, j = -1, Z = !1, K = !1, Q,
                J = !1, $ = !1, ee = !1, et = !1, ei = !0, er = !0, es, eo = !1, en = !1, ea = 0;
            if (a.boostData && a.boostData.length > 0) return;
            a.gapSize && (en = "value" !== a.gapUnit ? a.gapSize * e.closestPointRange : a.gapSize), z && (es = [], z.forEach((e, t) => {
                if (e.color) {
                    let i = S(e.color).rgba;
                    i[0] /= 255, i[1] /= 255, i[2] /= 255, es[t] = i, eo || void 0 !== e.value || (eo = i)
                }
            }), eo || (eo = S(e.pointAttribs && e.pointAttribs().fill || e.color).rgba, eo[0] /= 255, eo[1] /= 255, eo[2] /= 255)), n.inverted && (G = e.chart.plotHeight), e.closestPointRangePx = Number.MAX_VALUE;
            let el = e => {
                e && (t.colorData.push(e[0]), t.colorData.push(e[1]), t.colorData.push(e[2]), t.colorData.push(e[3]))
            }, eh = (e, o, n, a = 1, l) => {
                el(l), 1 !== D && (!r.useGPUTranslations || t.skipTranslation) && (e *= D, o *= D, a *= D), r.usePreallocated && s ? (s.push(e, o, n ? 1 : 0, a), ea += 4) : (i.push(e), i.push(o), i.push(n ? D : 0), i.push(a))
            }, ed = () => {
                t.segments.length && (t.segments[t.segments.length - 1].to = i.length || ea)
            }, ef = () => {
                t.segments.length && t.segments[t.segments.length - 1].from === (i.length || ea) || (ed(), t.segments.push({from: i.length || ea}))
            }, eu = (e, t, i, r, s) => {
                el(s), eh(e + i, t), el(s), eh(e, t), el(s), eh(e, t + r), el(s), eh(e, t + r), el(s), eh(e + i, t + r), el(s), eh(e + i, t)
            };
            if (ef(), C && C.length > 0) {
                t.skipTranslation = !0, t.drawMode = "TRIANGLES", C[0].node && C[0].node.levelDynamic && C.sort((e, t) => {
                    if (e.node) {
                        if (e.node.levelDynamic > t.node.levelDynamic) return 1;
                        if (e.node.levelDynamic < t.node.levelDynamic) return -1
                    }
                    return 0
                }), C.forEach(t => {
                    let i, r;
                    let s = t.plotY;
                    if (void 0 !== s && !isNaN(s) && null !== t.y && t.shapeArgs) {
                        let {x: s = 0, y: o = 0, width: a = 0, height: l = 0} = t.shapeArgs;
                        i = (r = n.styledMode ? t.series.colorAttribs(t) : r = t.series.pointAttribs(t))["stroke-width"] || 0, ee = S(r.fill).rgba, ee[0] /= 255, ee[1] /= 255, ee[2] /= 255, e.is("treemap") && (i = i || 1, V = S(r.stroke).rgba, V[0] /= 255, V[1] /= 255, V[2] /= 255, eu(s, o, a, l, V), i /= 2), e.is("heatmap") && n.inverted && (s = h.len - s, o = d.len - o, a = -a, l = -l), eu(s + i, o + i, a - 2 * i, l - 2 * i, ee)
                    }
                }), ed();
                return
            }
            for (; j < k.length - 1;) {
                if (void 0 === (W = k[++j])) continue;
                if (w) break;
                let i = u && u[j];
                if (!P && R(i, !0) && i.color && (ee = S(i.color).rgba, ee[0] /= 255, ee[1] /= 255, ee[2] /= 255), P ? (H = W[0], q = W[1], k[j + 1] && (K = k[j + 1][0]), k[j - 1] && (Z = k[j - 1][0]), W.length >= 3 && (Y = W[2], W[2] > t.zMax && (t.zMax = W[2]), W[2] < t.zMin && (t.zMin = W[2]))) : (H = W, q = y?.[j], k[j + 1] && (K = k[j + 1]), k[j - 1] && (Z = k[j - 1]), v && v.length && (Y = v[j], v[j] > t.zMax && (t.zMax = v[j]), v[j] < t.zMin && (t.zMin = v[j]))), !T && (null === H || null === q)) {
                    ef();
                    continue
                }
                if (K && K >= m && K <= c && (J = !0), Z && Z >= m && Z <= c && ($ = !0), o ? (P && (q = W.slice(1, 3)), Q = e.getColumn("low", !0)?.[j], q = e.getColumn("high", !0)?.[j] || 0) : f && (H = W.x, Q = (q = W.stackY) - W.y), null != b && null != x && (ei = q >= b && q <= x), H > c && M.x < c && (M.x = H, M.y = q), H < m && E.x > m && (E.x = H, E.y = q), null !== q || !T) {
                    if (null === q || !ei && !J && !$) {
                        ef();
                        continue
                    }
                    if (l && (K >= m || H >= m) && (Z <= c || H <= c) && (et = !0), et || J || $) {
                        if (en && H - Z > en && ef(), z) {
                            let e;
                            z.some((t, i) => {
                                let r = z[i - 1];
                                return "x" === L ? void 0 !== t.value && H <= t.value && (es[i] && (!r || H >= r.value) && (e = es[i]), !0) : void 0 !== t.value && q <= t.value && (es[i] && (!r || q >= r.value) && (e = es[i]), !0)
                            }), ee = e || eo || ee
                        }
                        if (r.useGPUTranslations || (t.skipTranslation = !0, H = h.toPixels(H, !0), q = d.toPixels(q, !0), !(H > G) || "POINTS" !== t.drawMode)) {
                            if (t.hasMarkers && et && !1 !== I && (e.closestPointRangePx = Math.min(e.closestPointRangePx, Math.abs(H - I))), !r.useGPUTranslations && !r.usePreallocated && I && 1 > Math.abs(H - I) && B && 1 > Math.abs(q - B)) {
                                r.debug.showSkipSummary && ++X;
                                continue
                            }
                            U && (O = Q || 0, (!1 === Q || void 0 === Q) && (O = q < 0 ? q : 0), (o || f) && !d.logarithmic || (O = Math.max(null === _ ? b : _, b)), r.useGPUTranslations || (O = d.toPixels(O, !0)), eh(H, O, 0, 0, ee)), a.step && !er && eh(H, B, 0, 2, ee), eh(H, q, 0, "bubble" === e.type ? Y || 1 : 2, ee), I = H, B = q, F = !0, er = !1
                        }
                    }
                }
            }
            r.debug.showSkipSummary && console.log("skipped points:", X);
            let eg = (e, i) => {
                if (r.useGPUTranslations || (t.skipTranslation = !0, e.x = h.toPixels(e.x, !0), e.y = d.toPixels(e.y, !0)), i) {
                    this.data = [e.x, e.y, 0, 2].concat(this.data);
                    return
                }
                eh(e.x, e.y, 0, 2)
            };
            !F && !1 !== T && "line_strip" === e.drawMode && (E.x < Number.MAX_VALUE && eg(E, !0), M.x > -Number.MAX_VALUE && eg(M)), ed()
        }

        pushSeries(e) {
            let t = this.markerData, i = this.series, r = this.settings;
            i.length > 0 && i[i.length - 1].hasMarkers && (i[i.length - 1].markerTo = t.length), r.debug.timeSeriesProcessing && console.time("building " + e.type + " series");
            let s = {
                segments: [],
                markerFrom: t.length,
                colorData: [],
                series: e,
                zMin: Number.MAX_VALUE,
                zMax: -Number.MAX_VALUE,
                hasMarkers: !!e.options.marker && !1 !== e.options.marker.enabled,
                showMarkers: !0,
                drawMode: v[e.type] || "LINE_STRIP"
            };
            e.index >= i.length ? i.push(s) : i[e.index] = s, this.pushSeriesData(e, s), r.debug.timeSeriesProcessing && console.timeEnd("building " + e.type + " series")
        }

        flush() {
            let e = this.vbuffer;
            this.data = [], this.markerData = [], this.series = [], e && e.destroy()
        }

        setXAxis(e) {
            let t = this.shader;
            if (!t) return;
            let i = this.getPixelRatio();
            t.setUniform("xAxisTrans", e.transA * i), t.setUniform("xAxisMin", e.min), t.setUniform("xAxisMinPad", e.minPixelPadding * i), t.setUniform("xAxisPointRange", e.pointRange), t.setUniform("xAxisLen", e.len * i), t.setUniform("xAxisPos", e.pos * i), t.setUniform("xAxisCVSCoord", !e.horiz), t.setUniform("xAxisIsLog", !!e.logarithmic), t.setUniform("xAxisReversed", !!e.reversed)
        }

        setYAxis(e) {
            let t = this.shader;
            if (!t) return;
            let i = this.getPixelRatio();
            t.setUniform("yAxisTrans", e.transA * i), t.setUniform("yAxisMin", e.min), t.setUniform("yAxisMinPad", e.minPixelPadding * i), t.setUniform("yAxisPointRange", e.pointRange), t.setUniform("yAxisLen", e.len * i), t.setUniform("yAxisPos", e.pos * i), t.setUniform("yAxisCVSCoord", !e.horiz), t.setUniform("yAxisIsLog", !!e.logarithmic), t.setUniform("yAxisReversed", !!e.reversed)
        }

        setThreshold(e, t) {
            let i = this.shader;
            i && (i.setUniform("hasThreshold", e), i.setUniform("translatedThreshold", t))
        }

        renderChart(e) {
            let t = this.gl, i = this.settings, r = this.shader, s = this.vbuffer, o = this.getPixelRatio();
            if (!e) return !1;
            this.width = e.chartWidth * o, this.height = e.chartHeight * o;
            let n = this.height, a = this.width;
            if (!t || !r || !a || !n) return !1;
            i.debug.timeRendering && console.time("gl rendering"), t.canvas.width = a, t.canvas.height = n, r.bind(), t.viewport(0, 0, a, n), r.setPMatrix(I.orthoMatrix(a, n)), i.lineWidth > 1 && !h().isMS && t.lineWidth(i.lineWidth), s && (s.build(this.data, "aVertexPosition", 4), s.bind()), r.setInverted(e.inverted), this.series.forEach((n, a) => {
                let l = n.series.options, h = l.marker, d = void 0 !== l.lineWidth ? l.lineWidth : 1, f = l.threshold,
                    u = U(f), g = n.series.yAxis.getThreshold(f),
                    m = _(l.marker ? l.marker.enabled : null, !!n.series.xAxis.isRadial || null, n.series.closestPointRangePx > 2 * ((l.marker ? l.marker.radius : 10) || 10)),
                    c = this.textureHandles[h && h.symbol || n.series.symbol] || this.textureHandles.circle, p, b, x,
                    A = [];
                if (0 !== n.segments.length && n.segments[0].from !== n.segments[0].to && (c.isReady && (t.bindTexture(t.TEXTURE_2D, c.handle), r.setTexture(c.handle)), e.styledMode ? n.series.markerGroup === n.series.chart.boost?.markerGroup ? (delete n.series.markerGroup, n.series.markerGroup = n.series.plotGroup("markerGroup", "markers", "visible", 1, e.seriesGroup).addClass("highcharts-tracker"), x = n.series.markerGroup.getStyle("fill"), n.series.markerGroup.destroy(), n.series.markerGroup = n.series.chart.boost?.markerGroup) : x = n.series.markerGroup?.getStyle("fill") : (x = "POINTS" === n.drawMode && n.series.pointAttribs && n.series.pointAttribs().fill || n.series.color, l.colorByPoint && (x = n.series.chart.options.colors[a])), n.series.fillOpacity && l.fillOpacity && (x = new (y())(x).setOpacity(_(l.fillOpacity, 1)).get()), A = S(x).rgba, i.useAlpha || (A[3] = 1), "add" === l.boostBlending ? (t.blendFunc(t.SRC_ALPHA, t.ONE), t.blendEquation(t.FUNC_ADD)) : "mult" === l.boostBlending || "multiply" === l.boostBlending ? t.blendFunc(t.DST_COLOR, t.ZERO) : "darken" === l.boostBlending ? (t.blendFunc(t.ONE, t.ONE), t.blendEquation(t.FUNC_MIN)) : t.blendFuncSeparate(t.SRC_ALPHA, t.ONE_MINUS_SRC_ALPHA, t.ONE, t.ONE_MINUS_SRC_ALPHA), r.reset(), n.colorData.length > 0 ? (r.setUniform("hasColor", 1), (b = new E(t, r)).build(Array(n.segments[0].from).concat(n.colorData), "aColor", 4), b.bind()) : (r.setUniform("hasColor", 0), t.disableVertexAttribArray(t.getAttribLocation(r.getProgram(), "aColor"))), r.setColor(A), this.setXAxis(n.series.xAxis), this.setYAxis(n.series.yAxis), this.setThreshold(u, g), "POINTS" === n.drawMode && r.setPointSize(2 * _(l.marker && l.marker.radius, .5) * o), r.setSkipTranslation(n.skipTranslation), "bubble" === n.series.type && r.setBubbleUniforms(n.series, n.zMin, n.zMax, o), r.setDrawAsCircle(D[n.series.type] || !1), s)) {
                    if (d > 0 || "LINE_STRIP" !== n.drawMode) for (p = 0; p < n.segments.length; p++) s.render(n.segments[p].from, n.segments[p].to, n.drawMode);
                    if (n.hasMarkers && m) for (r.setPointSize(2 * _(l.marker && l.marker.radius, 5) * o), r.setDrawAsCircle(!0), p = 0; p < n.segments.length; p++) s.render(n.segments[p].from, n.segments[p].to, "POINTS")
                }
            }), i.debug.timeRendering && console.timeEnd("gl rendering"), this.postRenderCallback && this.postRenderCallback(this), this.flush()
        }

        render(e) {
            if (this.clear(), e.renderer.forExport) return this.renderChart(e);
            this.isInited ? this.renderChart(e) : setTimeout(() => {
                this.render(e)
            }, 1)
        }

        setSize(e, t) {
            let i = this.shader;
            i && (this.width !== e || this.height !== t) && (this.width = e, this.height = t, i.bind(), i.setPMatrix(I.orthoMatrix(e, t)))
        }

        init(e, t) {
            let i = this.settings;
            if (this.isInited = !1, !e) return !1;
            i.debug.timeSetup && console.time("gl setup");
            for (let t = 0; t < G.length && (this.gl = e.getContext(G[t], {}), !this.gl); ++t) ;
            let r = this.gl;
            if (!r) return !1;
            t || this.flush(), r.enable(r.BLEND), r.blendFunc(r.SRC_ALPHA, r.ONE_MINUS_SRC_ALPHA), r.disable(r.DEPTH_TEST), r.depthFunc(r.LESS);
            let s = this.shader = new k(r);
            if (!s) return !1;
            this.vbuffer = new E(r, s);
            let o = (e, t) => {
                let i = {isReady: !1, texture: M.createElement("canvas"), handle: r.createTexture()},
                    s = i.texture.getContext("2d");
                this.textureHandles[e] = i, i.texture.width = 512, i.texture.height = 512, s.mozImageSmoothingEnabled = !1, s.webkitImageSmoothingEnabled = !1, s.msImageSmoothingEnabled = !1, s.imageSmoothingEnabled = !1, s.strokeStyle = "rgba(255, 255, 255, 0)", s.fillStyle = "#FFF", t(s);
                try {
                    r.activeTexture(r.TEXTURE0), r.bindTexture(r.TEXTURE_2D, i.handle), r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, r.RGBA, r.UNSIGNED_BYTE, i.texture), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, r.LINEAR), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.LINEAR), r.bindTexture(r.TEXTURE_2D, null), i.isReady = !0
                } catch (e) {
                }
            };
            return o("circle", e => {
                e.beginPath(), e.arc(256, 256, 256, 0, 2 * Math.PI), e.stroke(), e.fill()
            }), o("square", e => {
                e.fillRect(0, 0, 512, 512)
            }), o("diamond", e => {
                e.beginPath(), e.moveTo(256, 0), e.lineTo(512, 256), e.lineTo(256, 512), e.lineTo(0, 256), e.lineTo(256, 0), e.fill()
            }), o("triangle", e => {
                e.beginPath(), e.moveTo(0, 512), e.lineTo(256, 0), e.lineTo(512, 512), e.lineTo(0, 512), e.fill()
            }), o("triangle-down", e => {
                e.beginPath(), e.moveTo(0, 0), e.lineTo(256, 512), e.lineTo(512, 0), e.lineTo(0, 0), e.fill()
            }), this.isInited = !0, i.debug.timeSetup && console.timeEnd("gl setup"), !0
        }

        destroy() {
            let e = this.gl, t = this.shader, i = this.vbuffer;
            this.flush(), i && i.destroy(), t && t.destroy(), e && (z(this.textureHandles, t => {
                t.handle && e.deleteTexture(t.handle)
            }), e.canvas.width = 1, e.canvas.height = 1)
        }
    }

    let {getBoostClipRect: B, isChartSeriesBoosting: O} = x, {getOptions: V} = h(), {
        composed: X,
        doc: F,
        noop: H,
        win: q
    } = h(), {
        addEvent: W,
        destroyObjectProperties: Y,
        error: j,
        extend: Z,
        fireEvent: K,
        isArray: Q,
        isNumber: J,
        pick: $,
        pushUnique: ee,
        wrap: et,
        defined: ei
    } = h();

    function er(e, t) {
        let i = t.boost;
        e && i && i.target && i.canvas && !O(t.chart) && e.allocateBufferForSingleSeries(t)
    }

    function es(e) {
        return $(e && e.options && e.options.boost && e.options.boost.enabled, !0)
    }

    function eo(e, t) {
        let i = e.constructor, s = e.seriesGroup || t.group, o = e.chartWidth, n = e.chartHeight, a = e,
            l = "undefined" != typeof SVGForeignObjectElement, h = !1;
        O(e) ? a = e : (a = t, h = !!(t.options.events?.click || t.options.point?.events?.click));
        let d = a.boost = a.boost || {};
        if (l = !1, r || (r = F.createElement("canvas")), !d.target && (d.canvas = r, e.renderer.forExport || !l ? (a.renderTarget = d.target = e.renderer.image("", 0, 0, o, n).addClass("highcharts-boost-canvas").add(s), d.clear = function () {
            d.target.attr({href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="})
        }, d.copy = function () {
            d.resize(), d.target.attr({href: d.canvas.toDataURL("image/png")})
        }) : (d.targetFo = e.renderer.createElement("foreignObject").add(s), a.renderTarget = d.target = F.createElement("canvas"), d.targetCtx = d.target.getContext("2d"), d.targetFo.element.appendChild(d.target), d.clear = function () {
            d.target.width = d.canvas.width, d.target.height = d.canvas.height
        }, d.copy = function () {
            d.target.width = d.canvas.width, d.target.height = d.canvas.height, d.targetCtx.drawImage(d.canvas, 0, 0)
        }), d.resize = function () {
            o = e.chartWidth, n = e.chartHeight, (d.targetFo || d.target).attr({
                x: 0,
                y: 0,
                width: o,
                height: n
            }).css({
                pointerEvents: h ? void 0 : "none",
                mixedBlendMode: "normal",
                opacity: 1
            }).addClass(h ? "highcharts-tracker" : ""), a instanceof i && a.boost?.markerGroup?.translate(e.plotLeft, e.plotTop)
        }, d.clipRect = e.renderer.clipRect(), (d.targetFo || d.target).attr({zIndex: t.options.zIndex}), a instanceof i && (a.boost.markerGroup = a.renderer.g().add(s).translate(t.xAxis.pos, t.yAxis.pos))), d.canvas.width = o, d.canvas.height = n, d.clipRect) {
            let t = B(e, a),
                i = t.width === e.clipBox.width && t.height === e.clipBox.height ? s : d.targetFo || d.target;
            d.clipRect.attr(t), i?.clip(d.clipRect)
        }
        return d.resize(), d.clear(), !d.wgl && (d.wgl = new I(e => {
            e.settings.debug.timeBufferCopy && console.time("buffer copy"), d.copy(), e.settings.debug.timeBufferCopy && console.timeEnd("buffer copy")
        }), d.wgl.init(d.canvas) || j("[highcharts boost] - unable to init WebGL renderer"), d.wgl.setOptions(e.options.boost || {}), a instanceof i && d.wgl.allocateBuffer(e)), d.wgl.setSize(o, n), d.wgl
    }

    function en(e) {
        let t = e.points;
        if (t) {
            let e, i;
            for (i = 0; i < t.length; i += 1) (e = t[i]) && e.destroyElements && e.destroyElements()
        }
        for (let t of (["graph", "area", "tracker"].forEach(t => {
            let i = e[t];
            i && (e[t] = i.destroy())
        }), e.zones)) Y(t, void 0, !0)
    }

    function ea(e, t, i, r, s, o) {
        let n = (s = s || 0) + (r = r || 3e3), a = !0;
        for (; a && s < n && s < e.length;) a = t(e[s], s), ++s;
        a && (s < e.length ? o ? ea(e, t, i, r, s, o) : q.requestAnimationFrame ? q.requestAnimationFrame(function () {
            ea(e, t, i, r, s)
        }) : setTimeout(ea, 0, e, t, i, r, s) : i && i())
    }

    function el(e, t) {
        let i = e.options, r = e.dataTable.modified.rowCount, s = e.xAxis && e.xAxis.options,
            o = e.yAxis && e.yAxis.options, n = e.colorAxis && e.colorAxis.options;
        return r > (i.boostThreshold || Number.MAX_VALUE) && J(o.min) && J(o.max) && (!t || J(s.min) && J(s.max)) && (!n || J(n.min) && J(n.max))
    }

    let eh = (e, t) => !e.forceCrop && (O(e.chart) || (t ? t.length : 0) >= (e.options.boostThreshold || Number.MAX_VALUE));

    function ed() {
        let e = this, t = e.chart;
        t.boost && t.boost.markerGroup === e.markerGroup && (e.markerGroup = null), t.hoverPoints && (t.hoverPoints = t.hoverPoints.filter(function (t) {
            return t.series === e
        })), t.hoverPoint && t.hoverPoint.series === e && (t.hoverPoint = null)
    }

    function ef() {
        let e = this.boost;
        e && e.canvas && e.target && (e.wgl && e.wgl.clear(), e.clear && e.clear())
    }

    function eu(e) {
        let t = e.boost;
        t && t.canvas && t.target && t.wgl && !O(e.chart) && t.wgl.render(e.chart)
    }

    function eg(e, t) {
        let i = e.options, r = e.xAxis, s = e.pointClass;
        if (t instanceof s) return t;
        let o = (e.getColumn("x").length ? e.getColumn("x") : void 0) || i.xData || e.getColumn("x", !0) || !1,
            n = new s(e, (Q(e.options.data) ? e.options.data : [])[t.i], o ? o[t.i] : void 0);
        return n.category = $(r.categories ? r.categories[n.x] : n.x, n.x), n.key = n.name ?? n.category, n.dist = t.dist, n.distX = t.distX, n.plotX = t.plotX, n.plotY = t.plotY, n.index = t.i, n.percentage = t.percentage, n.isInside = e.isPointInside(n), n
    }

    function em(e) {
        var t, i, r, s;
        let {options: o, xAxis: n, yAxis: a} = this;
        if (!this.isDirty && !n.isDirty && !a.isDirty && !e) return !1;
        this.yAxis.setTickInterval();
        let l = o.boostThreshold || 0, h = o.cropThreshold, d = this.getColumn("x"), f = n.getExtremes(),
            u = f.max ?? Number.MAX_VALUE, g = f.min ?? -Number.MAX_VALUE, m = this.getColumn("y"), c = a.getExtremes(),
            p = c.max ?? Number.MAX_VALUE, b = c.min ?? -Number.MAX_VALUE;
        if (!this.boosted && n.old && a.old && g >= (n.old.min ?? -Number.MAX_VALUE) && u <= (n.old.max ?? Number.MAX_VALUE) && b >= (a.old.min ?? -Number.MAX_VALUE) && p <= (a.old.max ?? Number.MAX_VALUE)) return this.dataTable.modified.setColumns({
            x: d,
            y: m
        }), !0;
        let x = this.dataTable.rowCount;
        if (!l || x < l || h && !this.forceCrop && !this.getExtremesFromAll && !o.getExtremesFromAll && x < h) return this.dataTable.modified.setColumns({
            x: d,
            y: m
        }), !0;
        let A = [], y = [], v = [], P = !(J(f.max) || J(f.min)), T = !(J(c.max) || J(c.min)), C = !1, k, E = d[0],
            S = d[0], M, w = m?.[0], U = m?.[0];
        for (let e = 0, t = d.length; e < t; ++e) k = d[e], M = m?.[e], k >= g && k <= u && M >= b && M <= p ? (A.push({
            x: k,
            y: M
        }), y.push(k), v.push(M), P && (E = Math.max(E, k), S = Math.min(S, k)), T && (w = Math.max(w, M), U = Math.min(U, M))) : C = !0;
        return P && ((t = n.options).max ?? (t.max = E), (i = n.options).min ?? (i.min = S)), T && ((r = a.options).max ?? (r.max = w), (s = a.options).min ?? (s.min = U)), this.cropped = C, this.cropStart = 0, this.dataTable.modified.setColumns({
            x: y,
            y: v
        }), eh(this, y) || (this.processedData = A), !0
    }

    function ec() {
        let e = this.options || {}, t = this.chart, r = t.boost, s = this.boost, o = this.xAxis, n = this.yAxis,
            a = e.xData || this.getColumn("x", !0), l = e.yData || this.getColumn("y", !0),
            h = this.getColumn("low", !0), d = this.getColumn("high", !0), f = this.processedData || e.data,
            u = o.getExtremes(), g = u.min - (o.minPointOffset || 0), m = u.max + (o.minPointOffset || 0),
            c = n.getExtremes(), p = c.min - (n.minPointOffset || 0), b = c.max + (n.minPointOffset || 0), x = {},
            A = !!this.sampling, y = e.enableMouseTracking, v = e.threshold,
            P = this.pointArrayMap && "low,high" === this.pointArrayMap.join(","), T = !!e.stacking,
            C = this.cropStart || 0, k = this.requireSorting, E = !a, S = "x" === e.findNearestPointBy,
            M = (this.getColumn("x", !0).length ? this.getColumn("x", !0) : void 0) || this.options.xData || this.getColumn("x", !0),
            w = $(e.lineWidth, 1), U = !1, R, L = n.getThreshold(v), z, _, N, D;
        if (o.isPanning || n.isPanning || (U = eo(t, this), t.boosted = !0, !this.visible)) return;
        (this.points || this.graph) && en(this), O(t) ? (this.markerGroup && this.markerGroup !== r?.markerGroup && this.markerGroup.destroy(), this.markerGroup = r?.markerGroup, s && s.target && (this.renderTarget = s.target = s.target.destroy())) : (this.markerGroup === r?.markerGroup && (this.markerGroup = void 0), this.markerGroup = this.plotGroup("markerGroup", "markers", "visible", 1, t.seriesGroup).addClass("highcharts-tracker"));
        let G = this.points = [], I = (e, r, s, a) => {
            let l = !!M && M[C + s], h = e => {
                t.inverted && (e = o.len - e, r = n.len - r), G.push({
                    destroy: H,
                    x: l,
                    clientX: e,
                    plotX: e,
                    plotY: r,
                    i: C + s,
                    percentage: a
                })
            };
            e = Math.ceil(e), i = S ? e : e + "," + r, y && (x[i] ? l === M[M.length - 1] && (G.length--, h(e)) : (x[i] = !0, h(e)))
        };
        this.buildKDTree = H, K(this, "renderCanvas"), this.is("line") && w > 1 && s?.target && r && !r.lineWidthFilter && (r.lineWidthFilter = t.renderer.definition({
            tagName: "filter",
            children: [{tagName: "feMorphology", attributes: {operator: "dilate", radius: .25 * w}}],
            attributes: {id: "linewidth"}
        }), s.target.attr({filter: "url(#linewidth)"})), U && (er(U, this), U.pushSeries(this), eu(this));
        let B = U.settings;
        t.renderer.forExport || (B.debug.timeKDTree && console.time("kd tree building"), ea(T ? this.data.slice(C) : a || f, function (e, i) {
            let r = void 0 === t.index, s, a, f, u, c, x = !1, y = !0;
            return !ei(e) || (!r && (E ? (s = e[0], a = e[1]) : (s = e, a = l?.[i]), P ? (E && (a = e.slice(1, 3)), x = h[i], a = d[i]) : T && (s = e.x, x = (a = e.stackY) - e.y, c = e.percentage), k || (y = (a || 0) >= p && a <= b), null !== a && s >= g && s <= m && y && (f = o.toPixels(s, !0), A ? ((void 0 === N || f === R) && (P || (x = a), (void 0 === D || a > _) && (_ = a, D = i), (void 0 === N || x < z) && (z = x, N = i)), S && f === R || (void 0 !== N && (u = n.toPixels(_, !0), L = n.toPixels(z, !0), I(f, u, D, c), L !== u && I(f, L, N, c)), N = D = void 0, R = f)) : I(f, u = Math.ceil(n.toPixels(a, !0)), i, c))), !r)
        }, () => {
            K(this, "renderedCanvas"), delete this.buildKDTree, this.options && this.buildKDTree(), B.debug.timeKDTree && console.timeEnd("kd tree building")
        }))
    }

    function ep(e) {
        let t = !0;
        if (this.chart.options && this.chart.options.boost && (t = void 0 === this.chart.options.boost.enabled || this.chart.options.boost.enabled), !t || !this.boosted) return e.call(this);
        this.chart.boosted = !0;
        let i = eo(this.chart, this);
        i && (er(i, this), i.pushSeries(this)), eu(this)
    }

    function eb(e) {
        if (this.boosted) {
            if (el(this)) return {};
            if (this.xAxis.isPanning || this.yAxis.isPanning) return this
        }
        return e.apply(this, [].slice.call(arguments, 1))
    }

    function ex(e) {
        let t = this.options.data;
        if (es(this.chart) && f[this.type]) {
            let i = this.is("scatter") && !this.is("bubble") && !this.is("treemap") && !this.is("heatmap");
            if (!eh(this, t) || i || this.is("treemap") || this.options.stacking || !el(this, !0)) {
                if (this.boosted && (this.xAxis?.isPanning || this.yAxis?.isPanning)) return;
                i && !this.yAxis.treeGrid ? em.call(this, arguments[1]) : e.apply(this, [].slice.call(arguments, 1)), t = this.getColumn("x", !0)
            }
            if (this.boosted = eh(this, t), this.boosted) {
                let e;
                !this.options.data?.length || J(e = this.getFirstValidPoint(this.options.data)) || Q(e) || this.is("treemap") || j(12, !1, this.chart), function (e) {
                    e.boost = e.boost || {getPoint: t => eg(e, t)};
                    let t = e.boost.altered = [];
                    if (["allowDG", "directTouch", "stickyTracking"].forEach(i => {
                        t.push({prop: i, val: e[i], own: Object.hasOwnProperty.call(e, i)})
                    }), e.allowDG = !1, e.directTouch = !1, e.stickyTracking = !0, e.finishedAnimating = !0, e.labelBySeries && (e.labelBySeries = e.labelBySeries.destroy()), e.is("scatter") && !e.is("treemap") && e.data.length) {
                        for (let t of e.data) t?.destroy?.();
                        e.data.length = 0, e.points.length = 0, delete e.processedData
                    }
                }(this)
            } else !function (e) {
                let t = e.boost, i = e.chart, r = i.boost;
                if (r?.markerGroup) for (let e of (r.markerGroup.destroy(), r.markerGroup = void 0, i.series)) e.markerGroup = void 0, e.markerGroup = e.plotGroup("markerGroup", "markers", "visible", 1, i.seriesGroup).addClass("highcharts-tracker");
                t && ((t.altered || []).forEach(t => {
                    t.own ? e[t.prop] = t.val : delete e[t.prop]
                }), t.clear && t.clear()), (i.seriesGroup || e.group)?.clip()
            }(this)
        } else e.apply(this, [].slice.call(arguments, 1))
    }

    function eA(e) {
        let t = e.apply(this, [].slice.call(arguments, 1));
        return this.boost && t ? this.boost.getPoint(t) : t
    }

    let ey = {
            compose: function (e, t, i) {
                if (ee(X, "Boost.Series")) {
                    let r = V().plotOptions, s = e.prototype;
                    if (W(e, "destroy", ed), W(e, "hide", ef), i && (s.renderCanvas = ec), et(s, "getExtremes", eb), et(s, "processData", ex), et(s, "searchPoint", eA), ["translate", "generatePoints", "drawTracker", "drawPoints", "render"].forEach(e => (function (e, t, i) {
                        function r(e) {
                            let t = this.options.stacking && ("translate" === i || "generatePoints" === i);
                            this.boosted && !t && es(this.chart) && "heatmap" !== this.type && "treemap" !== this.type && f[this.type] && 0 !== this.options.boostThreshold ? "render" === i && this.renderCanvas && this.renderCanvas() : e.call(this)
                        }

                        if (et(e, i, r), "translate" === i) for (let e of ["column", "arearange", "columnrange", "heatmap", "treemap"]) t[e] && et(t[e].prototype, i, r)
                    })(s, t, e)), d.forEach(e => {
                        let i = r[e];
                        i && (i.boostThreshold = 5e3, i.boostData = [], t[e].prototype.fillOpacity = !0)
                    }), i) {
                        let {area: e, areaspline: i, bubble: r, column: s, heatmap: o, scatter: n, treemap: a} = t;
                        if (e && Z(e.prototype, {fill: !0, fillOpacity: !0, sampling: !0}), i && Z(i.prototype, {
                            fill: !0,
                            fillOpacity: !0,
                            sampling: !0
                        }), r) {
                            let e = r.prototype;
                            delete e.buildKDTree, et(e, "markerAttribs", function (e) {
                                return !this.boosted && e.apply(this, [].slice.call(arguments, 1))
                            })
                        }
                        s && Z(s.prototype, {fill: !0, sampling: !0}), n && (n.prototype.fill = !0), [o, a].forEach(e => {
                            e && et(e.prototype, "drawPoints", ep)
                        })
                    }
                }
                return e
            }, destroyGraphics: en, eachAsync: ea, getPoint: eg
        }, ev = {
            defaultHTMLColorMap: {
                aliceblue: "#f0f8ff",
                antiquewhite: "#faebd7",
                aqua: "#00ffff",
                aquamarine: "#7fffd4",
                azure: "#f0ffff",
                beige: "#f5f5dc",
                bisque: "#ffe4c4",
                blanchedalmond: "#ffebcd",
                blue: "#0000ff",
                blueviolet: "#8a2be2",
                brown: "#a52a2a",
                burlywood: "#deb887",
                cadetblue: "#5f9ea0",
                chartreuse: "#7fff00",
                chocolate: "#d2691e",
                coral: "#ff7f50",
                cornflowerblue: "#6495ed",
                cornsilk: "#fff8dc",
                crimson: "#dc143c",
                cyan: "#00ffff",
                darkblue: "#00008b",
                darkcyan: "#008b8b",
                darkgoldenrod: "#b8860b",
                darkgray: "#a9a9a9",
                darkgreen: "#006400",
                darkkhaki: "#bdb76b",
                darkmagenta: "#8b008b",
                darkolivegreen: "#556b2f",
                darkorange: "#ff8c00",
                darkorchid: "#9932cc",
                darkred: "#8b0000",
                darksalmon: "#e9967a",
                darkseagreen: "#8fbc8f",
                darkslateblue: "#483d8b",
                darkslategray: "#2f4f4f",
                darkturquoise: "#00ced1",
                darkviolet: "#9400d3",
                deeppink: "#ff1493",
                deepskyblue: "#00bfff",
                dimgray: "#696969",
                dodgerblue: "#1e90ff",
                feldspar: "#d19275",
                firebrick: "#b22222",
                floralwhite: "#fffaf0",
                forestgreen: "#228b22",
                fuchsia: "#ff00ff",
                gainsboro: "#dcdcdc",
                ghostwhite: "#f8f8ff",
                gold: "#ffd700",
                goldenrod: "#daa520",
                gray: "#808080",
                grey: "#808080",
                green: "#008000",
                greenyellow: "#adff2f",
                honeydew: "#f0fff0",
                hotpink: "#ff69b4",
                indianred: "#cd5c5c",
                indigo: "#4b0082",
                ivory: "#fffff0",
                khaki: "#f0e68c",
                lavender: "#e6e6fa",
                lavenderblush: "#fff0f5",
                lawngreen: "#7cfc00",
                lemonchiffon: "#fffacd",
                lightblue: "#add8e6",
                lightcoral: "#f08080",
                lightcyan: "#e0ffff",
                lightgoldenrodyellow: "#fafad2",
                lightgrey: "#d3d3d3",
                lightgreen: "#90ee90",
                lightpink: "#ffb6c1",
                lightsalmon: "#ffa07a",
                lightseagreen: "#20b2aa",
                lightskyblue: "#87cefa",
                lightslateblue: "#8470ff",
                lightslategray: "#778899",
                lightsteelblue: "#b0c4de",
                lightyellow: "#ffffe0",
                lime: "#00ff00",
                limegreen: "#32cd32",
                linen: "#faf0e6",
                magenta: "#ff00ff",
                maroon: "#800000",
                mediumaquamarine: "#66cdaa",
                mediumblue: "#0000cd",
                mediumorchid: "#ba55d3",
                mediumpurple: "#9370d8",
                mediumseagreen: "#3cb371",
                mediumslateblue: "#7b68ee",
                mediumspringgreen: "#00fa9a",
                mediumturquoise: "#48d1cc",
                mediumvioletred: "#c71585",
                midnightblue: "#191970",
                mintcream: "#f5fffa",
                mistyrose: "#ffe4e1",
                moccasin: "#ffe4b5",
                navajowhite: "#ffdead",
                navy: "#000080",
                oldlace: "#fdf5e6",
                olive: "#808000",
                olivedrab: "#6b8e23",
                orange: "#ffa500",
                orangered: "#ff4500",
                orchid: "#da70d6",
                palegoldenrod: "#eee8aa",
                palegreen: "#98fb98",
                paleturquoise: "#afeeee",
                palevioletred: "#d87093",
                papayawhip: "#ffefd5",
                peachpuff: "#ffdab9",
                peru: "#cd853f",
                pink: "#ffc0cb",
                plum: "#dda0dd",
                powderblue: "#b0e0e6",
                purple: "#800080",
                red: "#ff0000",
                rosybrown: "#bc8f8f",
                royalblue: "#4169e1",
                saddlebrown: "#8b4513",
                salmon: "#fa8072",
                sandybrown: "#f4a460",
                seagreen: "#2e8b57",
                seashell: "#fff5ee",
                sienna: "#a0522d",
                silver: "#c0c0c0",
                skyblue: "#87ceeb",
                slateblue: "#6a5acd",
                slategray: "#708090",
                snow: "#fffafa",
                springgreen: "#00ff7f",
                steelblue: "#4682b4",
                tan: "#d2b48c",
                teal: "#008080",
                thistle: "#d8bfd8",
                tomato: "#ff6347",
                turquoise: "#40e0d0",
                violet: "#ee82ee",
                violetred: "#d02090",
                wheat: "#f5deb3",
                whitesmoke: "#f5f5f5",
                yellow: "#ffff00",
                yellowgreen: "#9acd32"
            }
        }, {doc: eP, win: eT} = h(), {addEvent: eC, error: ek} = h(),
        eE = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"];

    function eS() {
        let e;
        if (void 0 !== eT.WebGLRenderingContext) {
            e = eP.createElement("canvas");
            for (let t = 0; t < eE.length; ++t) try {
                if (null != e.getContext(eE[t])) return !0
            } catch (e) {
            }
        }
        return !1
    }

    let eM = {
        compose: function (e, t, i, r, s) {
            let o = eS();
            o || (void 0 !== h().initCanvasBoost ? h().initCanvasBoost() : ek(26)), s && !s.names.lightgoldenrodyellow && (s.names = {...s.names, ...ev.defaultHTMLColorMap}), x.compose(e, o), ey.compose(i, r, o), eC(t, "setExtremes", function (e) {
                for (let t of [this.chart, ...this.series].map(e => e.renderTarget).filter(Boolean)) {
                    let {horiz: i, pos: r} = this, s = i ? "scaleX" : "scaleY", o = i ? "translateX" : "translateY",
                        n = t?.[s] ?? 1, a = 1, l = 0, h = 1, d = "none";
                    this.isPanning && (a = (e.scale ?? 1) * n, l = (t?.[o] || 0) - a * (e.move || 0) + n * r - a * r, h = .7, d = "blur(3px)"), t?.attr({
                        [s]: a,
                        [o]: l
                    }).css({transition: "250ms filter, 250ms opacity", filter: d, opacity: h})
                }
            })
        }, hasWebGLSupport: eS
    }, ew = h();
    ew.hasWebGLSupport = eM.hasWebGLSupport, eM.compose(ew.Chart, ew.Axis, ew.Series, ew.seriesTypes, ew.Color);
    let eU = h();
    return a.default
})());