Component({externalClasses:["l-class","l-header-wrapper-class","l-header-class","l-header-sticky-class","l-body-class"],options:{multipleSlots:!0},relations:{"../sticky/index":{type:"parent"}},properties:{top:{type:Number,value:0}},data:{mode:void 0,index:void 0,isFixedTop:!1,stickyItemTop:0,stickyItemHeight:0,stickyItemWrapperHeight:void 0},lifetimes:{ready:function(){const t=this.getParentComponet().data.mode;this.setData({mode:t})}},methods:{updateStickyItemPosition(t){const e=this.getParentComponet(),{index:i,stickyItemTop:s,stickyItemHeight:a,top:o}=this.data,n=t>s-o&&t<a+s-o;this.data.isFixedTop!==n&&(n?e.triggerEvent("linsticky",{index:i}):e.triggerEvent("linunsticky",{index:i}),this.setData({isFixedTop:n}))},updateStickyItemBaseData(t){this.setData({index:t});const e=this.getParentComponet().data.scrollTop,i=wx.createSelectorQuery().in(this);i.select(".l-sticky-item").boundingClientRect(t=>{this.setData({stickyItemTop:t.top+e,stickyItemHeight:t.height})}).exec(),i.select(".l-sticky-item-header").boundingClientRect(t=>{this.setData({stickyItemWrapperHeight:t.height})}).exec()},getParentComponet(){const t=this.getRelationNodes("../sticky/index");if(0!==t.length)return t[0]}}});