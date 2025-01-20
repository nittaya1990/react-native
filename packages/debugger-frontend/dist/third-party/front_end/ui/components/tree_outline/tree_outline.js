import*as e from"../../../core/platform/platform.js";import*as t from"../../lit-html/lit-html.js";import*as r from"../../visual_logging/visual_logging.js";import*as o from"../code_highlighter/code_highlighter.js";import*as n from"../helpers/helpers.js";import*as i from"../render_coordinator/render_coordinator.js";const s=new CSSStyleSheet;function a(e){return"children"in e}s.replaceSync(':host{--list-group-padding:16px}li{border:2px solid transparent;list-style:none;text-overflow:ellipsis;min-height:12px}.compact{border:0}.tree-item:hover{background-color:var(--sys-color-state-hover-on-subtle)}.tree-node-key{white-space:var(--override-key-whitespace-wrapping);min-width:0;flex-grow:1}.arrow-icon{display:block;user-select:none;mask-image:var(--image-file-triangle-right);background-color:var(--icon-default);content:"";text-shadow:none;height:14px;width:14px;overflow:hidden;flex:none;transition:transform 200ms}ul{margin:0;padding:0}ul[role="group"]{padding-left:var(--list-group-padding)}li:not(.parent) > .arrow-and-key-wrapper > .arrow-icon{mask-size:0}li.parent.expanded > .arrow-and-key-wrapper > .arrow-icon{transform:rotate(90deg)}li.is-top-level{border-top:var(--override-top-node-border)}li.is-top-level:last-child{border-bottom:var(--override-top-node-border)}:host([animated]) li:not(.is-top-level){animation-name:slideIn;animation-duration:150ms;animation-timing-function:cubic-bezier(0,0,0.3,1);animation-fill-mode:forwards}@keyframes slideIn{from{transform:translateY(-5px);opacity:0%}to{transform:none;opacity:100%}}.arrow-and-key-wrapper{display:flex;align-content:center;align-items:center;& ::selection{background-color:var(--sys-color-state-focus-select)}}[role="treeitem"]:focus{outline:0}ul[role="tree"]:focus-within [role="treeitem"].selected > .arrow-and-key-wrapper{background-color:var(--sys-color-tonal-container)}.text-ellipsis{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.inline-icon{vertical-align:sub}@media (forced-colors: active){.arrow-icon{background-color:ButtonText}ul[role="tree"]:focus-within [role="treeitem"].selected{outline:solid 1px ButtonText}}\n/*# sourceURL=treeOutline.css */\n');class d extends t.Directive.Directive{constructor(e){if(super(e),e.type!==t.Directive.PartType.ATTRIBUTE)throw new Error("TrackDOMNodeToTreeNode directive must be used as an attribute.")}update(e,[t,r]){const o=e.element;if(!(o instanceof HTMLLIElement))throw new Error("trackTreeNodeToDOMNode must be used on <li> elements.");t.set(o,r)}render(e,t){}}const l=t.Directive.directive(d),c=e=>{const t=e.parentElement?.parentElement;if(t&&t instanceof HTMLLIElement){const e=t.nextElementSibling;return e&&e instanceof HTMLLIElement?e:c(t)}return null},h=e=>{const t=e.querySelector(':scope > [role="group"] > [role="treeitem"]:first-child');if(!t)throw new Error("Could not find child of expanded node.");return t},p=e=>null!==e.getAttribute("aria-expanded"),u=e=>p(e)&&"true"===e.getAttribute("aria-expanded"),f=e=>{const t=e.querySelector(':scope > [role="group"] > [role="treeitem"]:last-child');if(!t)throw new Error("Could not find child of expanded node.");return u(t)?f(t):t},m=e=>{let t=e.parentElement;if(!t)return null;for(;t&&"treeitem"!==t.getAttribute("role")&&t instanceof HTMLLIElement==!1;)t=t.parentElement;return t},w=new WeakMap,N=async e=>{if(!e.children)throw new Error("Asked for children of node that does not have any children.");const t=w.get(e);if(t)return t;const r=await e.children();return w.set(e,r),r},g=async(e,t)=>{for(const r of e){const e=await v(r,t,[r]);if(null!==e)return e}return null},v=async(e,t,r)=>{if(e.id===t)return r;if(e.children){const o=await N(e);for(const e of o){const o=await v(e,t,[...r,e]);if(null!==o)return o}}return null},y=e=>{const{currentDOMNode:t,currentTreeNode:r,direction:o,setNodeExpandedState:n}=e;if(!r)return t;if("ArrowDown"===o){if(u(t))return h(t);const e=(e=>{const t=e.nextElementSibling;return t&&t instanceof HTMLLIElement?t:null})(t);if(e)return e;const r=c(t);if(r)return r}else{if("ArrowRight"===o)return p(t)?u(t)?h(t):(n(r,!0),t):t;if("ArrowUp"===o){const e=(e=>{const t=e.previousElementSibling;return t&&t instanceof HTMLLIElement?t:null})(t);if(e)return u(e)?f(e):e;const r=m(t);if(r&&r instanceof HTMLLIElement)return r}else if("ArrowLeft"===o){if(u(t))return n(r,!1),t;const e=m(t);if(e&&e instanceof HTMLLIElement)return e}}return t};var T=Object.freeze({__proto__:null,isExpandableNode:a,trackDOMNodeToTreeNode:l,getNodeChildren:N,getPathToTreeNode:g,findNextNodeForTreeOutlineKeyboardNavigation:y});const E=i.RenderCoordinator.RenderCoordinator.instance();class x extends Event{static eventName="itemselected";data;constructor(e){super(x.eventName,{bubbles:!0,composed:!0}),this.data={node:e}}}class b extends Event{static eventName="itemmouseover";data;constructor(e){super(b.eventName,{bubbles:!0,composed:!0}),this.data={node:e}}}class S extends Event{static eventName="itemmouseout";data;constructor(e){super(S.eventName,{bubbles:!0,composed:!0}),this.data={node:e}}}class k extends HTMLElement{static litTagName=t.literal`devtools-tree-outline`;#e=this.attachShadow({mode:"open"});#t=[];#r=new Map;#o=new WeakMap;#n=!1;#i=null;#s=null;#a=(e,r)=>("string"!=typeof e.treeNodeData&&console.warn(`The default TreeOutline renderer simply stringifies its given value. You passed in ${JSON.stringify(e.treeNodeData,null,2)}. Consider providing a different defaultRenderer that can handle nodes of this type.`),t.html`${String(e.treeNodeData)}`);#d;#l=!1;#c=!1;#h=!1;static get observedAttributes(){return["nowrap","toplevelbordercolor"]}attributeChangedCallback(e,t,r){switch(e){case"nowrap":this.#p(r);break;case"toplevelbordercolor":this.#u(r)}}connectedCallback(){this.#u(this.getAttribute("toplevelbordercolor")),this.#p(this.getAttribute("nowrap")),this.#e.adoptedStyleSheets=[s,o.Style.default]}get data(){return{tree:this.#t,defaultRenderer:this.#a}}set data(e){this.#a=e.defaultRenderer,this.#t=e.tree,this.#d=e.filter,this.#l=e.compact||!1,this.#n||(this.#s=this.#t[0]),this.#f()}async expandRecursively(e=2){await Promise.all(this.#t.map((t=>this.#m(t,0,e)))),await this.#f()}async collapseAllNodes(){this.#r.clear(),await this.#f()}async expandToAndSelectTreeNode(e){return this.expandToAndSelectTreeNodeId(e.id)}async expandToAndSelectTreeNodeId(e){const t=await g(this.#t,e);if(null===t)throw new Error(`Could not find node with id ${e} in the tree.`);t.forEach(((e,r)=>{r<t.length-1&&this.#w(e,!0)})),this.#i=e,await this.#f()}expandNodeIds(e){return e.forEach((e=>this.#r.set(e,!0))),this.#f()}focusNodeId(e){return this.#i=e,this.#f()}async collapseChildrenOfNode(e){const t=this.#o.get(e);t&&(await this.#N(t),await this.#f())}#p(e){this.style.setProperty("--override-key-whitespace-wrapping",null!==e?"nowrap":"initial")}#u(e){this.style.setProperty("--override-top-node-border",e?`1px solid ${e}`:"")}async#N(e){if(!a(e)||!this.#g(e))return;const t=await this.#v(e),r=Promise.all(t.map((e=>this.#N(e))));await r,this.#w(e,!1)}async#y(e,t){const r=await N(e),o=[];for(const e of r){const r=t(e.treeNodeData),n=this.#T(e)||e.id===this.#i,i=this.#r.get(e.id);if("SHOW"===r||n||i)o.push(e);else if("FLATTEN"===r&&a(e)){const r=await this.#y(e,t);o.push(...r)}}return o}async#v(e){const t=await N(e),r=this.#d;if(!r)return t;const o=await this.#y(e,r);return o.length?o:t}#w(e,t){this.#r.set(e.id,t)}#g(e){return this.#r.get(e.id)||!1}async#m(e,t,r){if(!a(e))return;if(this.#w(e,!0),t===r||!a(e))return;const o=await this.#v(e);await Promise.all(o.map((e=>this.#m(e,t+1,r))))}#E(e){return t=>{t.stopPropagation(),a(e)&&(this.#w(e,!this.#g(e)),this.#f())}}#x(e){e.stopPropagation();const t=null!==this.getAttribute("clickabletitle"),r=e.currentTarget,o=this.#o.get(r);t&&o&&a(o)&&this.#w(o,!this.#g(o)),this.#b(r)}async#b(e){const t=this.#o.get(e);t&&(this.#s=t,await this.#f(),this.dispatchEvent(new x(t)),E.write("DOMNode focus",(()=>{e.focus()})))}#S(e){if("Home"===e){const e=this.#e.querySelector('ul[role="tree"] > li[role="treeitem"]');e&&this.#b(e)}else if("End"===e){const e=this.#e.querySelectorAll('li[role="treeitem"]'),t=e[e.length-1];t&&this.#b(t)}}async#k(e,t){const r=this.#o.get(t);if(!r)return;const o=y({currentDOMNode:t,currentTreeNode:r,direction:e,setNodeExpandedState:(e,t)=>this.#w(e,t)});await this.#b(o)}#I(e){const t=this.#o.get(e);if(t&&a(t)){const e=this.#g(t);this.#w(t,!e),this.#f()}}async#C(t){if(!(t.target instanceof HTMLLIElement))throw new Error("event.target was not an <li> element");"Home"===t.key||"End"===t.key?(t.preventDefault(),this.#S(t.key)):e.KeyboardUtilities.keyIsArrowKey(t.key)?(t.preventDefault(),await this.#k(t.key,t.target)):"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this.#I(t.target))}#A(e){this.#i=null,this.#b(e)}#T(e){return!!this.#s&&e.id===this.#s.id}#D(e,{depth:o,setSize:i,positionInSet:s}){let d;const c=this.#g(e);if(a(e)&&c){const r=this.#v(e).then((e=>e.map(((t,r)=>this.#D(t,{depth:o+1,setSize:e.length,positionInSet:r})))));d=t.html`<ul role="group">${t.Directives.until(r)}</ul>`}else d=t.nothing;const h=this.#T(e)?0:-1,p=t.Directives.classMap({expanded:a(e)&&c,parent:a(e),selected:this.#T(e),"is-top-level":0===o,compact:this.#l}),u=t.Directives.ifDefined(a(e)?String(c):void 0);let f;return f=e.renderer?e.renderer(e,{isExpanded:c}):this.#a(e,{isExpanded:c}),t.html`
      <li role="treeitem"
        tabindex=${h}
        aria-setsize=${i}
        aria-expanded=${u}
        aria-level=${o+1}
        aria-posinset=${s+1}
        class=${p}
        jslog=${r.treeItem(e.jslogContext).track({click:!0,keydown:"ArrowUp|ArrowDown|ArrowLeft|ArrowRight|Enter|Space|Home|End"})}
        @click=${this.#x}
        track-dom-node-to-tree-node=${l(this.#o,e)}
        on-render=${n.Directives.nodeRenderedCallback((t=>{t instanceof HTMLLIElement&&this.#i&&e.id===this.#i&&this.#A(t)}))}
      >
        <span class="arrow-and-key-wrapper"
          @mouseover=${()=>{this.dispatchEvent(new b(e))}}
          @mouseout=${()=>{this.dispatchEvent(new S(e))}}
        >
          <span class="arrow-icon" @click=${this.#E(e)} jslog=${r.expand().track({click:!0})}>
          </span>
          <span class="tree-node-key" data-node-key=${e.treeNodeData}>${f}</span>
        </span>
        ${d}
      </li>
    `}async#f(){if(!this.#c)return this.#c=!0,await E.write("TreeOutline render",(()=>{t.render(t.html`
      <div class="wrapping-container">
        <ul role="tree" @keydown=${this.#C}>
          ${this.#t.map(((e,t)=>this.#D(e,{depth:0,setSize:this.#t.length,positionInSet:t})))}
        </ul>
      </div>
      `,this.#e,{host:this})})),this.#n=!0,this.#c=!1,this.#h?(this.#h=!1,this.#f()):void 0;this.#h=!0}}customElements.define("devtools-tree-outline",k);var I=Object.freeze({__proto__:null,defaultRenderer:function(e){return t.html`${e.treeNodeData}`},ItemSelectedEvent:x,ItemMouseOverEvent:b,ItemMouseOutEvent:S,TreeOutline:k});export{I as TreeOutline,T as TreeOutlineUtils};
