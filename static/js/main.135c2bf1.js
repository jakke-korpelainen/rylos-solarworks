/*! For license information please see main.135c2bf1.js.LICENSE.txt */
3]),o>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return i}))},V.prototype.loadTexture=function(e){var t=this.json,n=this.options,r=t.textures[e],i=t.images[r.source],a=this.textureLoader;if(i.uri){var o=n.manager.getHandler(i.uri);null!==o&&(a=o)}return this.loadTextureImage(e,i,a)},V.prototype.loadTextureImage=function(e,t,n){var r=this,i=this.json,a=this.options,o=i.textures[e],s=self.URL||self.webkitURL,l=t.uri,u=!1,c=!0;if("image/jpeg"===t.mimeType&&(c=!1),void 0!==t.bufferView)l=r.getDependency("bufferView",t.bufferView).then((function(e){if("image/png"===t.mimeType){var n=new DataView(e,25,1).getUint8(0,!1);c=6===n||4===n||3===n}u=!0;var r=new Blob([e],{type:t.mimeType});return l=s.createObjectURL(r)}));else if(void 0===t.uri)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");return Promise.resolve(l).then((function(e){return new Promise((function(t,r){var i=t;!0===n.isImageBitmapLoader&&(i=function(e){t(new ku(e))}),n.load(z(e,a.path),i,void 0,r)}))})).then((function(t){!0===u&&s.revokeObjectURL(l),t.flipY=!1,o.name&&(t.name=o.name),c||(t.format=dt);var n=(i.samplers||{})[o.sampler]||{};return t.magFilter=A[n.magFilter]||Ye,t.minFilter=A[n.minFilter]||$e,t.wrapS=C[n.wrapS]||Ue,t.wrapT=C[n.wrapT]||Ue,r.associations.set(t,{type:"textures",index:e}),t}))},V.prototype.assignTexture=function(e,t,r){var i=this;return this.getDependency("texture",r.index).then((function(a){if(void 0===r.texCoord||0==r.texCoord||"aoMap"===t&&1==r.texCoord||console.warn("THREE.GLTFLoader: Custom UV set "+r.texCoord+" for texture "+t+" not yet supported."),i.extensions[n.KHR_TEXTURE_TRANSFORM]){var o=void 0!==r.extensions?r.extensions[n.KHR_TEXTURE_TRANSFORM]:void 0;if(o){var s=i.associations.get(a);a=i.extensions[n.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),i.associations.set(a,s)}}e[t]=a}))},V.prototype.assignFinalMaterial=function(e){var t=e.geometry,n=e.material,r=void 0!==t.attributes.tangent,i=void 0!==t.attributes.color,a=void 0===t.attributes.normal,o=!0===e.isSkinnedMesh,s=Object.keys(t.morphAttributes).length>0,l=s&&void 0!==t.morphAttributes.normal;if(e.isPoints){var u="PointsMaterial:"+n.uuid,c=this.cache.get(u);c||(c=new yu,qi.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(u,c)),n=c}else if(e.isLine){u="LineBasicMaterial:"+n.uuid;var f=this.cache.get(u);f||(f=new su,qi.prototype.copy.call(f,n),f.color.copy(n.color),this.cache.add(u,f)),n=f}if(r||i||a||o||s){u="ClonedMaterial:"+n.uuid+":";n.isGLTFSpecularGlossinessMaterial&&(u+="specular-glossiness:"),o&&(u+="skinning:"),r&&(u+="vertex-tangents:"),i&&(u+="vertex-colors:"),a&&(u+="flat-shading:"),s&&(u+="morph-targets:"),l&&(u+="morph-normals:");var d=this.cache.get(u);d||(d=n.clone(),o&&(d.skinning=!0),i&&(d.vertexColors=!0),a&&(d.flatShading=!0),s&&(d.morphTargets=!0),l&&(d.morphNormals=!0),r&&(d.vertexTangents=!0,d.normalScale&&(d.normalScale.y*=-1),d.clearcoatNormalScale&&(d.clearcoatNormalScale.y*=-1)),this.cache.add(u,d),this.associations.set(d,this.associations.get(n))),n=d}n.aoMap&&void 0===t.attributes.uv2&&void 0!==t.attributes.uv&&t.setAttribute("uv2",t.attributes.uv),e.material=n},V.prototype.getMaterialType=function(){return Rc},V.prototype.loadMaterial=function(e){var t,r=this,i=this.json,a=this.extensions,o=i.materials[e],s={},l=o.extensions||{},u=[];if(l[n.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS]){var c=a[n.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS];t=c.getMaterialType(),u.push(c.extendParams(s,o,r))}else if(l[n.KHR_MATERIALS_UNLIT]){var f=a[n.KHR_MATERIALS_UNLIT];t=f.getMaterialType(),u.push(f.extendParams(s,o,r))}else{var d=o.pbrMetallicRoughness||{};if(s.color=new Ki(1,1,1),s.opacity=1,Array.isArray(d.baseColorFactor)){var h=d.baseColorFactor;s.color.fromArray(h),s.opacity=h[3]}void 0!==d.baseColorTexture&&u.push(r.assignTexture(s,"map",d.baseColorTexture)),s.metalness=void 0!==d.metallicFactor?d.metallicFactor:1,s.roughness=void 0!==d.roughnessFactor?d.roughnessFactor:1,void 0!==d.metallicRoughnessTexture&&(u.push(r.assignTexture(s,"metalnessMap",d.metallicRoughnessTexture)),u.push(r.assignTexture(s,"roughnessMap",d.metallicRoughnessTexture))),t=this._invokeOne((function(t){return t.getMaterialType&&t.getMaterialType(e)})),u.push(Promise.all(this._invokeAll((function(t){return t.extendMaterialParams&&t.extendMaterialParams(e,s)}))))}!0===o.doubleSided&&(s.side=W);var p=o.alphaMode||O;return p===N?(s.transparent=!0,s.depthWrite=!1):(s.transparent=!1,p===D&&(s.alphaTest=void 0!==o.alphaCutoff?o.alphaCutoff:.5)),void 0!==o.normalTexture&&t!==ea&&(u.push(r.assignTexture(s,"normalMap",o.normalTexture)),s.normalScale=new vr(1,-1),void 0!==o.normalTexture.scale&&s.normalScale.set(o.normalTexture.scale,-o.normalTexture.scale)),void 0!==o.occlusionTexture&&t!==ea&&(u.push(r.assignTexture(s,"aoMap",o.occlusionTexture)),void 0!==o.occlusionTexture.strength&&(s.aoMapIntensity=o.occlusionTexture.strength)),void 0!==o.emissiveFactor&&t!==ea&&(s.emissive=(new Ki).fromArray(o.emissiveFactor)),void 0!==o.emissiveTexture&&t!==ea&&u.push(r.assignTexture(s,"emissiveMap",o.emissiveTexture)),Promise.all(u).then((function(){var i;return i=t===v?a[n.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].createMaterial(s):new t(s),o.name&&(i.name=o.name),i.map&&(i.map.encoding=kn),i.emissiveMap&&(i.emissiveMap.encoding=kn),B(i,o),r.associations.set(i,{type:"materials",index:e}),o.extensions&&F(a,i,o),i}))},V.prototype.createUniqueName=function(e){for(var t=Jd.sanitizeNodeName(e||""),n=t,r=1;this.nodeNamesUsed[n];++r)n=t+"_"+r;return this.nodeNamesUsed[n]=!0,n},V.prototype.loadGeometries=function(e){var t=this,r=this.extensions,i=this.primitiveCache;function a(e){return r[n.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e,t).then((function(n){return q(n,e,t)}))}for(var o=[],s=0,l=e.length;s<l;s++){var u,c=e[s],f=H(c),d=i[f];if(d)o.push(d.promise);else u=c.extensions&&c.extensions[n.KHR_DRACO_MESH_COMPRESSION]?a(c):q(new Ma,c,t),i[f]={primitive:c,promise:u},o.push(u)}return Promise.all(o)},V.prototype.loadMesh=function(e){for(var t,n=this,r=this.json,i=this.extensions,a=r.meshes[e],o=a.primitives,s=[],l=0,u=o.length;l<u;l++){var c=void 0===o[l].material?(void 0===(t=this.cache).DefaultMaterial&&(t.DefaultMaterial=new Rc({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:j})),t.DefaultMaterial):this.getDependency("material",o[l].material);s.push(c)}return s.push(n.loadGeometries(o)),Promise.all(s).then((function(t){for(var r=t.slice(0,t.length-1),s=t[t.length-1],l=[],u=0,c=s.length;u<c;u++){var f,d=s[u],h=o[u],p=r[u];if(h.mode===M||h.mode===E||h.mode===T||void 0===h.mode)!0!==(f=!0===a.isSkinnedMesh?new $l(d,p):new Ga(d,p)).isSkinnedMesh||f.geometry.attributes.skinWeight.normalized||f.normalizeSkinWeights(),h.mode===E?f.geometry=X(f.geometry,Mn):h.mode===T&&(f.geometry=X(f.geometry,En));else if(h.mode===w)f=new vu(d,p);else if(h.mode===S)f=new hu(d,p);else if(h.mode===_)f=new gu(d,p);else{if(h.mode!==x)throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+h.mode);f=new Su(d,p)}Object.keys(f.geometry.morphAttributes).length>0&&U(f,a),f.name=n.createUniqueName(a.name||"mesh_"+e),B(f,a),h.extensions&&F(i,f,h),n.assignFinalMaterial(f),l.push(f)}if(1===l.length)return l[0];var m=new ml;for(u=0,c=l.length;u<c;u++)m.add(l[u]);return m}))},V.prototype.loadCamera=function(e){var t,n=this.json.cameras[e],r=n[n.type];if(r)return"perspective"===n.type?t=new Za(mr.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):"orthographic"===n.type&&(t=new Zf(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),B(t,n),Promise.resolve(t);console.warn("THREE.GLTFLoader: Missing camera parameters.")},V.prototype.loadSkin=function(e){var t=this.json.skins[e],n={joints:t.joints};return void 0===t.inverseBindMatrices?Promise.resolve(n):this.getDependency("accessor",t.inverseBindMatrices).then((function(e){return n.inverseBindMatrices=e,n}))},V.prototype.loadAnimation=function(e){for(var t=this.json.animations[e],n=[],r=[],i=[],a=[],o=[],s=0,l=t.channels.length;s<l;s++){var u=t.channels[s],c=t.samplers[u.sampler],f=u.target,d=void 0!==f.node?f.node:f.id,h=void 0!==t.parameters?t.parameters[c.input]:c.input,p=void 0!==t.parameters?t.parameters[c.output]:c.output;n.push(this.getDependency("node",d)),r.push(this.getDependency("accessor",h)),i.push(this.getDependency("accessor",p)),a.push(c),o.push(f)}return Promise.all([Promise.all(n),Promise.all(r),Promise.all(i),Promise.all(a),Promise.all(o)]).then((function(n){for(var r=n[0],i=n[1],a=n[2],o=n[3],s=n[4],l=[],u=0,c=r.length;u<c;u++){var f=r[u],d=i[u],h=a[u],p=o[u],m=s[u];if(void 0!==f){var v;switch(f.updateMatrix(),f.matrixAutoUpdate=!0,P[m.path]){case P.weights:v=Yc;break;case P.rotation:v=Zc;break;default:v=Jc}var g=f.name?f.name:f.uuid,y=void 0!==p.interpolation?I[p.interpolation]:vn,x=[];P[m.path]===P.weights?f.traverse((function(e){!0===e.isMesh&&e.morphTargetInfluences&&x.push(e.name?e.name:e.uuid)})):x.push(g);var w=h.array;if(h.normalized){var _;if(w.constructor===Int8Array)_=1/127;else if(w.constructor===Uint8Array)_=1/255;else if(w.constructor==Int16Array)_=1/32767;else{if(w.constructor!==Uint16Array)throw new Error("THREE.GLTFLoader: Unsupported output accessor component type.");_=1/65535}for(var S=new Float32Array(w.length),M=0,E=w.length;M<E;M++)S[M]=w[M]*_;w=S}for(M=0,E=x.length;M<E;M++){var T=new v(x[M]+"."+P[m.path],d.array,w,y);"CUBICSPLINE"===p.interpolation&&(T.createInterpolant=function(e){return new b(this.times,this.values,this.getValueSize()/3,e)},T.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0),l.push(T)}}}var k=t.name?t.name:"animation_"+e;return new Kc(k,void 0,l)}))},V.prototype.loadNode=function(e){var t=this.json,n=this.extensions,r=this,i=t.nodes[e],a=i.name?r.createUniqueName(i.name):"";return function(){var t=[];return void 0!==i.mesh&&t.push(r.getDependency("mesh",i.mesh).then((function(e){var t=r._getNodeRef(r.meshCache,i.mesh,e);return void 0!==i.weights&&t.traverse((function(e){if(e.isMesh)for(var t=0,n=i.weights.length;t<n;t++)e.morphTargetInfluences[t]=i.weights[t]})),t}))),void 0!==i.camera&&t.push(r.getDependency("camera",i.camera).then((function(e){return r._getNodeRef(r.cameraCache,i.camera,e)}))),r._invokeAll((function(t){return t.createNodeAttachment&&t.createNodeAttachment(e)})).forEach((function(e){t.push(e)})),Promise.all(t)}().then((function(t){var o;if((o=!0===i.isBone?new Jl:t.length>1?new ml:1===t.length?t[0]:new Ci)!==t[0])for(var s=0,l=t.length;s<l;s++)o.add(t[s]);if(i.name&&(o.userData.name=i.name,o.name=a),B(o,i),i.extensions&&F(n,o,i),void 0!==i.matrix){var u=new ii;u.fromArray(i.matrix),o.applyMatrix4(u)}else void 0!==i.translation&&o.position.fromArray(i.translation),void 0!==i.rotation&&o.quaternion.fromArray(i.rotation),void 0!==i.scale&&o.scale.fromArray(i.scale);return r.associations.set(o,{type:"nodes",index:e}),o}))},V.prototype.loadScene=function(){function e(t,n,r,i){var a=r.nodes[t];return i.getDependency("node",t).then((function(e){return void 0===a.skin?e:i.getDependency("skin",a.skin).then((function(e){for(var n=[],r=0,a=(t=e).joints.length;r<a;r++)n.push(i.getDependency("node",t.joints[r]));return Promise.all(n)})).then((function(n){return e.traverse((function(e){if(e.isMesh){for(var r=[],i=[],a=0,o=n.length;a<o;a++){var s=n[a];if(s){r.push(s);var l=new ii;void 0!==t.inverseBindMatrices&&l.fromArray(t.inverseBindMatrices.array,16*a),i.push(l)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[a])}e.bind(new tu(r,i),e.matrixWorld)}})),e}));var t})).then((function(t){n.add(t);var o=[];if(a.children)for(var s=a.children,l=0,u=s.length;l<u;l++){var c=s[l];o.push(e(c,t,r,i))}return Promise.all(o)}))}return function(t){var n=this.json,r=this.extensions,i=this.json.scenes[t],a=new ml;i.name&&(a.name=this.createUniqueName(i.name)),B(a,i),i.extensions&&F(r,a,i);for(var o=i.nodes||[],s=[],l=0,u=o.length;l<u;l++)s.push(e(o[l],a,n,this));return Promise.all(s).then((function(){return a}))}}(),e}();function hx(){var e=iv(dx,"/rylos-space-adventure/rock.gltf"),t=tg((function(e){return e.rocks}));return(0,Uy.jsx)(Uy.Fragment,{children:t.map((function(t){return(0,om.createElement)(px,c(c({},e),{},{key:t.guid,data:t}))}))})}var px=om.memo((function(e){var t=(0,om.useRef)(),n=tg((function(e){return e.clock})),r=tg((function(e){return e.actions.world.addExplode}));return(0,om.useEffect)((function(){return function(){r(e.data)}}),[]),tv((function(){try{if(n){var r=Math.cos(n.getElapsedTime()/2*e.data.speed)*Math.PI;t.current&&t.current.rotation&&t.current.rotation.set(r,r,r)}}catch(i){}})),(0,Uy.jsx)("group",{ref:t,position:e.data.offset,scale:[e.data.scale,e.data.scale,e.data.scale],children:(0,Uy.jsx)("group",{position:[-.016298329457640648,-.012838120572268963,.24073271453380585],rotation:[3.0093872578726644,.27444228385461117,-.22745113653772078],scale:[20,20,20],children:(0,Uy.jsx)("mesh",{geometry:e.nodes.node_id4_Material_52_0.geometry,material:e.materials.Material_52,"material-roughness":1,"material-metalness":1})})})})),mx=function(e,t){return{ref:om.createRef(),color:e,data:new Array(20).fill(null).map((function(){return[new kr,new kr(2*Math.random()-1,2*Math.random()-1,2*Math.random()-1).normalize().multiplyScalar(.75*t)]}))}};function vx(){var e=tg((function(e){return e.explosions}));return(0,Uy.jsx)(Uy.Fragment,{children:e.map((function(e){return(0,Uy.jsx)(yx,{guid:e.guid,position:e.offset,scale:.4*e.scale},e.guid)}))})}var gx=Vv()((function(){Hv(new Audio(Iv.explosion),.2)}),50),yx=function(e){var t=tg((function(e){return e.mutation})).dummy,n=tg((function(e){return e.actions.world.removeExplode})),r=(0,om.useRef)(),i=(0,om.useMemo)((function(){return[mx("white",.8),mx("firebrick",.6),mx("#f66a00",.3)]}),[]);return(0,om.useEffect)((function(){return gx()}),[]),(0,om.useEffect)((function(){setTimeout((function(){n(e.guid)}),1e3)}),[]),tv((function(){i.forEach((function(e,n){var i=e.data;if(r.current){var a=r.current.children[n];i.forEach((function(e,n){var r=m(e,2),i=r[0],o=r[1];i.add(o),t.position.copy(i),t.updateMatrix(),a.setMatrixAt(n,t.matrix)})),a.material instanceof qi&&(a.material.opacity-=.025),a.instanceMatrix&&(a.instanceMatrix.needsUpdate=!0)}}))})),(0,Uy.jsx)("group",{ref:r,position:e.position,scale:[e.scale,e.scale,e.scale],children:i.map((function(e,t){var n=e.color,r=e.data;return(0,Uy.jsxs)("instancedMesh",{args:[void 0,void 0,r.length],frustumCulled:!1,children:[(0,Uy.jsx)("dodecahedronGeometry",{args:[10,0]}),(0,Uy.jsx)("meshBasicMaterial",{color:n,transparent:!0,opacity:1,fog:!1})]},t)}))})};function bx(){var e=tg((function(e){return e.mutation})),t=e.scale,n=e.track;return(0,Uy.jsx)("mesh",{scale:[t,t,t],geometry:n,children:(0,Uy.jsx)("meshBasicMaterial",{color:"#9b51e0"})})}var xx=new Va(1,1,40),wx=new Ki("red"),_x=new Ki("orangered"),Sx=new Ki("#FFF293"),Mx=new ea({color:_x}),Ex=new ea({color:_x,fog:!1}),Tx=new kr,kx=new kr;function Ax(){var e=iv(dx,"/rylos-space-adventure/ship.gltf").nodes,t=tg((function(e){return e.clock})),n=tg((function(e){return e.mutation})),r=tg((function(e){return e.immunity})),i=tg((function(e){return e.lasers})),a=n.mouse,o=n.ray,s=(0,om.useRef)(),l=(0,om.useRef)(),u=(0,om.useRef)(),c=(0,om.useRef)(),f=(0,om.useRef)(),d=(0,om.useRef)();return tv((function(){if(s.current&&(t&&(s.current.position.z=Math.sin(40*t.getElapsedTime())*Math.PI*.2),s.current.rotation.z+=.2*(a.x/500-s.current.rotation.z),s.current.rotation.x+=.2*(-a.y/1200-s.current.rotation.x),s.current.rotation.y+=.2*(-a.x/1200-s.current.rotation.y),s.current.position.x+=.2*(a.x/10-s.current.position.x),s.current.position.y+=.2*(25+-a.y/10-s.current.position.y)),l.current)for(var e=0;e<i.length;e++){var r=l.current.children[e];r.position&&(r.position.z-=20)}u.current&&(u.current.intensity+=.3*((i.length&&Date.now()-i[i.length-1]<100?20:0)-u.current.intensity)),s.current&&(s.current.getWorldPosition(Tx),s.current.getWorldDirection(kx)),o.origin.copy(Tx),o.direction.copy(kx.negate()),Ex.color=n.hits?wx:_x,d.current&&(d.current.visible=!!n.hits)})),(0,Uy.jsxs)("group",{ref:s,children:[(0,Uy.jsx)("group",{visible:r,children:(0,Uy.jsxs)("mesh",{children:[(0,Uy.jsx)("sphereGeometry",{args:[13,8]}),(0,Uy.jsx)("meshBasicMaterial",{color:"#1a73c0",fog:!1,reflectivity:.2})]})}),(0,Uy.jsxs)("group",{scale:[3.5,3.5,3.5],children:[(0,Uy.jsxs)("group",{ref:f,position:[0,0,-300],name:"cross",children:[(0,Uy.jsx)("mesh",{renderOrder:1e3,material:Ex,children:(0,Uy.jsx)("boxGeometry",{args:[20,2,2]})}),(0,Uy.jsx)("mesh",{renderOrder:1e3,material:Ex,children:(0,Uy.jsx)("boxGeometry",{args:[2,20,2]})})]}),(0,Uy.jsxs)("group",{ref:d,position:[0,0,-300],name:"target",children:[(0,Uy.jsx)("mesh",{position:[0,20,0],renderOrder:1e3,material:Ex,children:(0,Uy.jsx)("boxGeometry",{args:[40,2,2]})}),(0,Uy.jsx)("mesh",{position:[0,-20,0],renderOrder:1e3,material:Ex,children:(0,Uy.jsx)("boxGeometry",{args:[40,2,2]})}),(0,Uy.jsx)("mesh",{position:[20,0,0],renderOrder:1e3,material:Ex,children:(0,Uy.jsx)("boxGeometry",{args:[2,40,2]})}),(0,Uy.jsx)("mesh",{position:[-20,0,0],renderOrder:1e3,material:Ex,children:(0,Uy.jsx)("boxGeometry",{args:[2,40,2]})})]}),(0,Uy.jsx)("pointLight",{ref:u,position:[0,0,-20],distance:100,intensity:.5,color:Sx}),(0,Uy.jsx)("group",{ref:l,children:i.map((function(e,t){return(0,Uy.jsxs)("group",{children:[(0,Uy.jsx)("mesh",{position:[-2.8,0,-.8],geometry:xx,material:Mx}),(0,Uy.jsx)("mesh",{position:[2.8,0,-.8],geometry:xx,material:Mx})]},t)}))}),(0,Uy.jsxs)("group",{rotation:[Math.PI/2,Math.PI,0],children:[(0,Uy.jsx)("mesh",{name:"Renault_(S,_T1)_0",geometry:e["Renault_(S,_T1)_0"].geometry,children:(0,Uy.jsx)("meshStandardMaterial",{color:"#16161d"})}),(0,Uy.jsx)("mesh",{name:"Renault_(S,_T1)_1",geometry:e["Renault_(S,_T1)_1"].geometry,children:(0,Uy.jsx)("meshStandardMaterial",{color:"#4c341c"})}),(0,Uy.jsx)("mesh",{name:"Renault_(S,_T1)_2",geometry:e["Renault_(S,_T1)_2"].geometry,children:(0,Uy.jsx)("meshStandardMaterial",{color:"#16161d"})}),(0,Uy.jsx)("mesh",{name:"Renault_(S,_T1)_3",geometry:e["Renault_(S,_T1)_3"].geometry,children:(0,Uy.jsx)("meshBasicMaterial",{color:"lightblue"})}),(0,Uy.jsx)("mesh",{name:"Renault_(S,_T1)_4",geometry:e["Renault_(S,_T1)_4"].geometry,children:(0,Uy.jsx)("meshBasicMaterial",{color:"orangered"})}),(0,Uy.jsx)("mesh",{name:"Renault_(S,_T1)_5",geometry:e["Renault_(S,_T1)_5"].geometry,children:(0,Uy.jsx)("meshBasicMaterial",{color:"orangered"})})]})]}),!1!==r&&(0,Uy.jsx)("pointLight",{ref:c,scale:[1,1,1],position:[0,1,30],distance:100,intensity:1,color:"orangered"})]})}var Cx,Lx,Rx,Px=0;function Ix(e){var t=(0,om.useRef)(),n=(0,om.useRef)(),r=tg((function(e){return e.mutation})),i=r.fov,a=r.scale,o=r.binormal,s=r.normal,l=r.track,u=r.mouse,c=ev().camera;return tv((function(){var e=r.t,n=r.position.clone(),f=l.tangents.length,d=e*f,h=Math.floor(d),p=(h+1)%f;o.subVectors(l.binormals[p],l.binormals[h]),o.multiplyScalar(d-h).add(l.binormals[h]);var m=l.parameters.path.getTangentAt(e);Px+=.05*(Math.max(15,15+-u.y/20)-Px),s.copy(o).cross(m),n.add(s.clone().multiplyScalar(Px)),c.position.copy(n);var v=l.parameters.path.getPointAt((e+30/l.parameters.path.getLength())%1).multiplyScalar(a);c.matrix.lookAt(c.position,v,s),c.quaternion.setFromRotationMatrix(c.matrix),c.fov+=.05*((e>.4&&e<.45?120:i)-c.fov),c.updateProjectionMatrix();var g=l.parameters.path.getPointAt((e+1/l.parameters.path.getLength())%1).multiplyScalar(a);t.current&&(t.current.position&&t.current.position.copy(g),t.current.position&&t.current.quaternion&&t.current.quaternion.setFromRotationMatrix(c.matrix))})),(0,Uy.jsxs)("group",{ref:t,children:[(0,Uy.jsx)("pointLight",{distance:400,position:[50,100,-420],intensity:5,color:"#9b51e0"}),(0,Uy.jsx)("group",{ref:n,position:[0,0,-50],children:e.children})]})}var Ox,Dx,Nx,zx=function(){var e=tg((function(e){return e.mutation})).fov,t=tg((function(e){return e.actions})),n=m((0,om.useState)(!0),2),r=n[0],i=n[1];return(0,om.useEffect)((function(){return function(){zv.pause(),Fv.pause(),Bv.pause()}}),[]),(0,Uy.jsxs)(Fx,{children:[(0,Uy.jsx)(Bx,{style:r?{}:{opacity:0,pointerEvents:"none"},children:(0,Uy.jsx)("h1",{children:"Loading..."})}),(0,Uy.jsxs)(Ux,{onTouchMove:function(e){var n=e.touches[0],r=n.clientX,i=n.clientY;t.player.move({x:r,y:i})},onPointerUp:t.player.cancelAutofire,onPointerMove:function(e){return t.player.move({x:e.clientX,y:e.clientY})},onPointerDown:function(e){t.player.move({x:e.clientX,y:e.clientY}),t.player.autofire(e)},children:[(0,Uy.jsxs)(Km,{linear:!0,mode:"concurrent",dpr:[1,1.5],gl:{antialias:!1},camera:{position:[0,0,2e3],near:.01,far:1e4,fov:e},onCreated:function(e){var n=e.gl,r=e.camera;console.log("created"),t.game.init(r),n.toneMapping=Le,n.setClearColor(new Ki("#020209")),setTimeout((function(){i(!1)}),500)},children:[(0,Uy.jsx)("fog",{attach:"fog",args:["#070710",100,700]}),(0,Uy.jsx)("ambientLight",{intensity:.2}),(0,Uy.jsx)(Xb,{}),(0,Uy.jsx)(vx,{}),(0,Uy.jsx)(bx,{}),(0,Uy.jsx)(fx,{}),(0,Uy.jsxs)(om.Suspense,{fallback:null,children:[(0,Uy.jsx)(hx,{}),(0,Uy.jsx)(Zb,{}),(0,Uy.jsx)(Ix,{children:(0,Uy.jsx)(Ax,{})})]}),(0,Uy.jsx)(cx,{})]}),(0,Uy.jsx)(Nb,{})]})]})},Fx=By.div(Cx||(Cx=r(["\n  height: 100%;\n"]))),Bx=By.div(Lx||(Lx=r(["\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0.5);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 999;\n  transition: opacity linear 2s;\n\n  h1 {\n    font-size: 3rem;\n    color: white;\n  }\n"]))),Ux=By.div(Rx||(Rx=r(["\n  height: 100%;\n"]))),Hx=function(){var e=tg((function(e){return e.actions.game.intro}));return(0,Uy.jsxs)(Hy,{children:[(0,Uy.jsx)(Qy,{words:["Credits"]}),(0,Uy.jsxs)(Gx,{children:[(0,Uy.jsx)("p",{children:(0,Uy.jsx)("a",{href:"https://github.com/jakke-korpelainen/rylos-space-adventure",children:"Source code"})}),(0,Uy.jsx)("h2",{children:"Programming"}),(0,Uy.jsx)("p",{children:(0,Uy.jsx)("a",{href:"https://jakke.fi",children:"Jakke Korpelainen"})}),(0,Uy.jsxs)("p",{children:["Based on tremendous work of ",(0,Uy.jsx)("a",{href:"https://github.com/drcmda",children:"drcmda"})]}),(0,Uy.jsx)("h2",{children:"Assets"}),(0,Uy.jsxs)("p",{children:["Ship: ",(0,Uy.jsx)("a",{href:"https://sketchfab.com/themuffincoder",children:"TheMuffinCoder"})]}),(0,Uy.jsxs)("p",{children:["Rocks: ",(0,Uy.jsx)("a",{href:"https://sketchfab.com/dzemalmclaren",children:"Dzemal Semanic"})]}),(0,Uy.jsxs)("p",{children:["Crash sound created by ",(0,Uy.jsx)("a",{href:"https://freesound.org/s/95078/",children:"sandyrb"})]}),(0,Uy.jsx)("h2",{children:"Music"}),(0,Uy.jsx)("p",{children:(0,Uy.jsx)("a",{href:"https://www.rylosplanet.fi/",children:"Rylos"})})]}),(0,Uy.jsx)(jy,{children:(0,Uy.jsx)(Vy,{onClick:function(){new Audio(Yy).play(),e()},children:"Back"})})]})},Gx=By.div(Ox||(Ox=r(["\n  width: 100%;\n  margin-top: 2rem;\n\n  a {\n    color: white;\n  }\n"]))),jx=n.p+"static/media/Cantarell-Regular.47b04e9b48cc5253ebec.woff2",Vx=n.p+"static/media/SedgwickAve-Regular.875f9a3b0a64cfdd15b6.woff2";function Wx(){var e=tg((function(e){return e.menu})),t=(0,Uy.jsx)(Jy,{});return"dead"===e&&(t=(0,Uy.jsx)(rb,{})),"game"===e&&(t=(0,Uy.jsx)(zx,{})),"credits"===e&&(t=(0,Uy.jsx)(Hx,{})),(0,Uy.jsxs)(Uy.Fragment,{children:[(0,Uy.jsx)(qx,{}),t]})}var qx=Py(Dx||(Dx=r(["\n  html, body {\n    margin: 0;\n    padding: 0;\n    height: 100%;\n    width: 100%;\n  }\n\n  #root {\n    width: 100%;\n    height: 100%;\n  }\n\n  * {\n    box-sizing: border-box;\n  }\n\n  #root {\n    cursor: none;\n  }\n\n  @font-face {\n    font-family: 'Sedgwick Ave';\n    src: url(",") format('woff2');\n    font-weight: 400;\n    font-style: normal;\n    font-display: swap;\n  }\n\n  @font-face {\n    font-family: 'Cantarell';\n    src: url(",") format('woff2');\n    font-weight: 400;\n    font-style: normal;\n    font-display: swap;\n  }\n\n  body {\n    font-family: 'Cantarell';\n  }\n\n  h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6 {\n    font-family: 'Sedgwick Ave';\n  }\n\n  .pulse {\n    transform: scale(1);\n    animation: pulse 0.525s infinite;\n  }\n\n  @keyframes wave-text{\n    00%{\n      transform: translateY(0em);\n    }\n    60%{\n      transform: translateY(-0.1em);\n    }\n    100%{\n      transform: translateY(0em);\n    }\n  }\n\n  @keyframes scroll-left {\n    0% {\n      transform: translateX(0);\n    }\n    100% {\n      transform: translateX(-100%);\n    }\n  }\n\n  @keyframes pulse {\n    0% {\n      transform: scale(0.75);\n    }\n\n    70% {\n      transform: scale(1);\n    }\n\n    100% {\n      transform: scale(0.75);\n    }\n  }\n"])),Vx,jx),Xx=(vy(Nx||(Nx=r(['\n  font-family: "Sedgwick Ave", sans-serif;\n  position: absolute;\n  text-transform: uppercase;\n  font-weight: 900;\n  font-variant-numeric: slashed-zero tabular-nums;\n  line-height: 1em;\n  pointer-events: none;\n  color: #9b51e0;\n']))),document.getElementById("root"));Xx&&(0,t.s)(Xx).render((0,Uy.jsx)(Wx,{}))}()}();
//# sourceMappingURL=main.135c2bf1.js.map