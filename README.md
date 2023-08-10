**Graphor**

轻量的 搭建系统 - 搭建器 - 可视化拖拽搭建工具

---

作为一个搭建类项目的Demo，在README中将介绍项目中的架构以及各环节的实现原理

同时附带项目的启动方法以及使用攻略

目前项目中的功能已基本完成：即可以实现 从0到1 的搭建以及打包下载搭建产物，同时组件已抽离为单独的文件夹，用于持续扩展组件内容

---

**目录**

一、系统使用攻略

二、系统架构

---

**一、系统使用攻略（想看架构的可直接跳过本章）**

这里提供两个链接地址：

https://github-magneto.github.io/app-graph/src-fs/build/#/graph

http://xprofession.cloud/graph/#/graph

第一个是Github的Page地址，可直接访问使用（因为没有申请Https，无法访问后端接口，无法创建账户，分享页面到世界）

第二个是我的云服务器地址，可以使用系统以及创建账户，不要输入重要信息，使用的是Http协议


    如果使用笔记本等小屏幕设备可按住【Control】【-】来调小浏览器尺寸，更好的体验。


与其他的搭建系统相似，主界面包括了：场景画布、添加元素、配置元素、预览大纲、控制器配置、以及保存发布......

想要本地跑项目，可以clone项目到本地，然后执行以下命令

    npm i && npm run start

**一般而言，操作的流程是这样的**

1、选择合适的元素添加到画布

2、调整被添加的元素的属性，例如宽度、高度、背景色，不同的元素具有一些特定的属性，例如图像有链接属性，输入框有默认值属性

3、如果存在包含关系，则进行元素位置的操作（在本系统需进入元素预览进行元素的位移）

4、重复1、2、3步骤，直到完成视图的搭建

5、再完成视图后，需要完成逻辑相关的搭建，为每一个具有逻辑的元素，添加上合适的逻辑，例如点击事件，或者被其他元素at后的事件（在本系统中需在元素配置面板的事件配置完成）

---

**二、系统架构**

**在开发前，设计系统时，需要问以下几个问题**

1、画布中的组件如何与配置面板的组件有一个同步的渲染？

2、组件的数据模型是怎么定义的？

3、画布以何种形式存储已添加的组件数据？

4、如何保证发布后的页面与搭建画布所展示的页面相同？

5、组件之间的事件联动如何处理？

6、如何将组件拆分到一个单独的项目中，即搭建系统为主项目，组件为子项目，组件的开发不影响搭建系统？

7、如何将搭建器作为一个单独的项目，由更高层级的业务应用项目引入搭建器进而使用，同时组件也是单独的项目，就可以实现引入搭建器 & 组件的形式来使用，达到完全解藕？

......

**项目的数据设计，整体思想是这样的**

1、画布中渲染的样貌，是一份数据，这一份数据贯穿全项目，不仅仅在画布用到，同时也在元素预览中用到，同时在发布页面时也会用到

2、这一份数据以JSON的形式来存储，同时它的最外层type应该是Array类型，其中包含了多个Object，每一个Object是一个元素

3、通过添加元素，将一份新的Object添加到上述的Array中，然后画布就拿到了最新的Array

4、画布通过遍历的方式将Array转换为View，最终渲染到页面上

5、画布中已添加的元素，如果需要进行配置其属性值，则只需要修改其对应的Object中的属性即可

6、因为存在元素中包含元素的关系，所以Array是一个树级结构，即这样的结构

    [
      {
        ..., 
        children: [
          {...}, 
          {...}, 
        ]
      }
    ]

7、画布需要递归遍历渲染元素

......

**元素的修改与渲染绑定设计，整体思路是这样的**

1、每一个元素被添加后即形成了一份Object，其中包含了元素的属性、名称、Key等信息，存储在全局的Array中

2、这份Object将作为参数传到元素的 Render 和 Edit中

3、Render负责渲染View，根据参数传进来的Object渲染出不同的样貌

4、Edit负责修改Object，修改之后，Render就会渲染新的视图

5、搭建器负责将 Render 和 Edit 融合到搭建器内，画布渲染 Render，元素配置面板渲染 Edit

......

**项目的发布设计，整体思路是这样的**

1、发布页面以 一份HTML & 多份JS 形成，其中JS资源虽然为多份，但可以进行整合为一个JS文件，或者直接放入HTML script中

2、发布页面需要支持微前端部署，即将搭建的东西嵌入到其他应用中，所以需要支持发布后的JS包含DOM Render

3、JS资源包含几个部分：搭建数据（上述的Array，这份Array同时应用于搭建器和发布后的内容）、组件数据（与Array中应用到的组件相对应，包含了组件的渲染内容）、渲染JS（将Array结合组件转化为View的JS代码）、渲染到DOM（DOM Render，将View绑定到指定DOM）

4、发布的过程就是实现步骤三，将各种资源整合在一起，生成JS、生成HTML、将JS绑定到HTML里面，然后导出

......

---

接下来就根据本项目的代码，逐个拆解设计疑问，同时解释系统架构

**项目目录概览**

https://github.com/github-magneto/app-graph

进入到项目主页，可以发现 src-fs 和 src-package 两个文件夹

src-fs 对应的是 业务应用级别 的项目容器，其中主要包含了业务按钮 业务接口，即保存搭建数据到数据库，发布搭建页面，账号相关操作，等等与业务相关的东西

src-fs 通过 import搭建器 以及 import组件，然后将组件加载到搭建器中，完成一连串的组件，形成最终的样貌

https://github.com/github-magneto/app-graph/blob/master/src-fs/src/view/Page.Graph.jsx

具体如何引入，这里插入一个链接，以供参考具体的代码为止，详细讲解在后文


**src-package目录概览**

https://github.com/github-magneto/app-graph/tree/master/src-package

进入到 src-package，其中包含多个文件夹，分别对应了三个模块

element 元素模块，可在其中开发元素，用于搭建器中

main 核心模块，搭建器模块，搭建器的控制逻辑 操作逻辑 渲染逻辑 都在这里

publish 发布模块，搭建完毕后需要进行页面发布，相关功能在这里

example 这个可以忽略，用于存储搭建数据的缓存文件夹，没有实际作用


**组件解析**

https://github.com/github-magneto/app-graph/tree/master/src-package/element/core/Basic-Input

进入到元素模块，其中一个Input元素，先通过了解元素是什么，其中包含了哪些东西

1、license.js：包含元素的基础信息，Key标识符（每一个元素的Key唯一，用于渲染过程中的识别）、Dep（元素的依赖，如元素依赖某一个库，则搭建控制器将提前加载这一库）

2、information.js：包含元素的属性、名称、类型、事件、是否具有子元素

3、Render.jsx：元素的渲染，用于画布以及发布后页面的渲染，搭建器将根据这一文件进行渲染View，同时传入Object来渲染出想要的效果

4、Edit.jsx：元素的配置面板展示，用于在搭建器中配置元素的属性

5、View.jsx：元素在添加元素时的预览视图

上面的数据设计有提到每一个元素是一个Object的形式被添加到全局的Array中

这一份Object是通过传参的形式传入 Render.jsx & Edit.jsx 中，Render负责使用、Edit负责修改

以下是一个简单的伪代码，来讲解这一部分

    // Render.jsx

    function Render(props) {
      return props.data.text
    }

    // Edit.jsx

    function Edit(props) {
      return <input value={props.data.text} onchange={e => props.data.text = e.target.value}/>
    }

因为控制器的渲染更新策略，当Edit中有做修改元素的属性时，画布能够及时的拿到最新的数据，然后重新渲染最新的组件Render，从而在画布中渲染出最新的View

**搭建器解析 —— 画布渲染**

https://github.com/github-magneto/app-graph/tree/master/src-package/main

https://github.com/github-magneto/app-graph/blob/master/src-package/main/view/Page.Graph.jsx

进入到画布模块，第一个链接是目录预览，第二个链接是画布的文件


画布的概念是渲染全局数据Array为View

例如Array中存在一个{ name: 'input', ..... }，那么画布就会把这份数据渲染成一个input到视图上

渲染是一个递归遍历，因为存在元素包含元素的情况，搭建器会将元素下的子元素作为参数形式传给元素内，元素内负责在哪个DOM渲染

代码行数：

https://github.com/github-magneto/app-graph/blob/master/src-package/main/view/Page.Graph.jsx#L218

https://github.com/github-magneto/app-graph/blob/master/src-package/main/view/Page.Graph.jsx#L112

https://github.com/github-magneto/app-graph/blob/master/src-package/element/core/Box-Basic/Render.jsx#L18


画布需要给每一个元素绑定点击事件，能够在点击元素后进入到该元素的配置面板，进行元素配置

代码行数：

https://github.com/github-magneto/app-graph/blob/master/src-package/main/view/Page.Graph.jsx#L106

画布中的渲染将Array中的数据作为参数传给元素的Render，然后元素进行计算渲染

https://github.com/github-magneto/app-graph/blob/master/src-package/main/view/Page.Graph.jsx#L138

https://github.com/github-magneto/app-graph/blob/master/src-package/element/core/Basic-Input/Render.jsx#L4


其中元素的Render不会存储在Array中，存储的是元素的Key，所以在渲染前需要根据Key找到元素的Render

代码行数：

https://github.com/github-magneto/app-graph/blob/master/src-package/main/view/Page.Graph.jsx#L79


**搭建器解析 —— 元素添加**

元素添加具备一个元素列表

在点击列表中的某个元素后，会生成一份Object，其中带有元素的特有信息

代码行数：

https://github.com/github-magneto/app-graph/blob/master/src-package/main/view/Modal.ElementShop.jsx#L25

**搭建器解析 —— 元素配置**

元素配置分为多个部分

1、style：元素的通用样式

2、property：元素的特有属性

3、children：元素的子元素

4、hook：元素的周期事件 （这节咱不讲解，放在后面事件系统讲解）

5、listen：元素的监听事件 （这节咱不讲解，放在后面事件系统讲解）

6、dispatch：元素的触发事件 （这节咱不讲解，放在后面事件系统讲解）

outer是所有元素都具有的，其中主要包含了元素的通用样式属性

代码行数

https://github.com/github-magneto/app-graph/blob/master/src-package/main/view/Modal.ElementConfig.jsx#L82

outer通过一个JS进行解析，然后引用到元素中

代码行数

https://github.com/github-magneto/app-graph/blob/master/src-package/main/utils/graph.outerStyle.js

https://github.com/github-magneto/app-graph/blob/master/src-package/main/view/Page.Graph.jsx#L122

inner是元素特有的属性，例如Image组件具有Src属性

代码行数

https://github.com/github-magneto/app-graph/blob/master/src-package/main/view/Modal.ElementConfig.jsx#L187

children是元素的子元素配置，部分元素具备

代码行数

https://github.com/github-magneto/app-graph/blob/master/src-package/main/view/Modal.ElementConfig.jsx#L217

在画布中整合children属性，然后传给父类元素

代码行数

https://github.com/github-magneto/app-graph/blob/master/src-package/main/view/Page.Graph.jsx#L112

在元素Redner中，将传参的children应用于指定位置

代码行数

https://github.com/github-magneto/app-graph/blob/master/src-package/element/core/Box-Basic/Render.jsx#L18

**搭建器解析 —— 元素概览**

代码行数

https://github.com/github-magneto/app-graph/blob/master/src-package/main/view/Modal.ElementOverview.jsx

**搭建器解析 —— 事件系统**

代码行数

https://github.com/github-magneto/app-graph/blob/master/src-package/main/view/Page.GraphPure.jsx#L19

https://github.com/github-magneto/app-graph/blob/master/src-package/main/view/Page.GraphPure.jsx#L35

https://github.com/github-magneto/app-graph/blob/master/src-package/main/view/Page.GraphPure.jsx#L50

https://github.com/github-magneto/app-graph/blob/master/src-package/main/view/Page.GraphPure.jsx#L89


https://github.com/github-magneto/app-graph/blob/master/src-package/main/view/Page.GraphPure.jsx#L89

https://github.com/github-magneto/app-graph/blob/master/src-package/element/core/Basic-Input/information.js#L11

https://github.com/github-magneto/app-graph/blob/master/src-package/element/core/Basic-Input/Render.jsx#L6

https://github.com/github-magneto/app-graph/blob/master/src-package/element/core/Basic-Input/Render.jsx#L25


https://github.com/github-magneto/app-graph/blob/master/src-package/main/utils/graph.event.js

**预览解析**

代码行数

https://github.com/github-magneto/app-graph/blob/master/src-package/main/view/Page.GraphPure.jsx

https://github.com/github-magneto/app-graph/blob/master/src-package/main/App.jsx#L73

**发布解析**

代码行数

https://github.com/github-magneto/app-graph/blob/master/src-package/main/view/Modal.ElementOverview.jsx

https://github.com/github-magneto/app-graph/blob/master/src-package/publish/webpack.js

https://github.com/github-magneto/app-graph/blob/master/src-fs/src/view/Modal.PagePublish.jsx