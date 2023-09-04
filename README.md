Below is the Github Page link, you can click the link, and enter the guide mode to understand the project. (Click the Guide Button In the upper left corner)

<https://github-magneto.github.io/project-graph/react-web-ui/build>


The document will be improved. There is some simple introduce.

# Graphor

## Description

This is a lightweight, universal, progressive, and scalable component web builder.

Web page development can be achieved through visual operations within the system, without the need for code or a small amount of code fragments.

Github demo usage address：<https://github-magneto.github.io/project-graph/react-web-ui/build>

You can experience this project builder in the demonstration address and refer to the usage methods of the builder in the next chapter

To run the project locally, you can clone the project locally and execute the following command

    cd react-web-ui && npm i && npm run start

## How to use

    Tip: If using small screen devices such as laptops results in incomplete display of page content, you can press and hold down 【 Control 】 【 - 】 to adjust the browser size for a better experience.

After entering the demonstration using the address, you can try to build it according to the following steps.

### Step 1: Add components to the canvas

Select "Element Shop" in the left navigation bar, select the "Input" component in the "Basic" type, and add two to the canvas

### Step 2: Component Configuration

In the canvas, click on the component and in the panel that appears on the left, click "Style Config" to expand the configuration style, and then click "Property Config" to expand the property configuration

### Step 3: Move Components

Select "Element Overview" in the left navigation bar to drag items to move components

### Step 4: Bind component event linkage

Select the first "Input" component A, and in the panel that appears on the left, click "Event Config/Monitor" to expand the listening event configuration. Add an event, edit the added event, and select "Set Value" for "Monitor Key" (this means that component A has registered an event listener, and when this listener is triggered, the "Set Value" function inside the component will be called to change the current value)

Select the second 'Input' component B, and in the panel that appears on the left, click 'Event Config/Trigger' to expand listening event configuration, add an event, edit the added event, and select 'Value Change' for 'Trigger Key', Select the name of the listening event just added for 'Link Monitor Name' (this means that component B has registered an event trigger, which will be triggered when the content of the 'Value Change' input box changes. The trigger will be associated with all the listening events of the currently selected Monitor Name, that is, the first listening event registered for component A)

In summary, the linkage process of components is as follows: the user enters some content in Component B ->triggers the Trigger of Component B ->The Trigger of Component B is associated with the Monitor of Component A through the Monitor Name, and Component B sends the output of "Value Change" to the Monitor of Component A ->The Monitor in Component A is triggered, accepts the incoming value, and is applied to the "Set Value" ->Component A in the view is set with the same content

(Among them, the "Set Value" of "Monitor Key" and the "Value Change" of "Trigger Key" are all built-in keys during component development. When using these keys in the builder, some logic set within the component will be automatically called. If the current key cannot meet the changes of the component, Eval can be used for more detailed operations, selecting "Eval" in "Monitor Type" and "Trigger Type Can open a code editor and code in functions)

### Step 5. Preview

The loading of views and events has been completed through the first four steps. By clicking on "Save" in the upper right corner, you can save the current build to the browser cache. Then, by clicking on "Preview" in the upper right corner, you can preview the packaged and published page in the newly opened page. You can try entering some content in the second "Input" to see

### Step 6: Publish

You can download the currently built HTML file by clicking on "Publish" in the upper right corner

### Generally speaking, the process of operation is as follows

1. Select appropriate elements to add to the canvas

2. Adjust the attributes of the added elements, such as width, height, and background color. Different elements have specific attributes, such as image links and input boxes with default values

3. If there is an inclusion relationship, perform the operation of element position (in this system, enter element preview to perform element displacement)

4. Repeat steps 1, 2, and 3 until the view is completed

5. After completing the view again, it is necessary to complete the logical related construction and add appropriate logic to each logical element, such as click events or events after being at by other elements (in this system, the event configuration needs to be completed in the element configuration panel)



## System architecture

### The overall idea of the project's data design is as follows

1. The appearance rendered in the canvas is a piece of data that runs through the entire project, not only used in the canvas, but also in element previews and when publishing pages

2. This data is stored in JSON format, and its outermost type should be an Array type, which contains multiple objects, each of which is an element

3. By adding elements, add a new Object to the above Array, and then the canvas will receive the latest Array

4. The canvas converts the Array into a View through traversal, and finally renders it onto the page

5. If you need to configure the attribute values of elements that have been added to the canvas, you only need to modify the attributes in their corresponding Object

6. Because there is a relationship between elements in the element, the Array is a tree level structure, which is such a structure

    [
      {
        ..., 
        children: [
          {...}, 
          {...}, 
        ]
      }
    ]

7. Canvas requires recursive traversal of rendering elements

......

### The overall idea of modifying elements and rendering binding design is as follows

1. After each element is added, it forms an Object, which contains information such as the element's attributes, name, and Key, and is stored in the global Array

2. This Object will be passed as a parameter to the element's Render and Edit

3. Render is responsible for rendering the View, rendering different appearances based on the objects passed in with parameters

4. Edit is responsible for modifying the object, and after making the modifications, Render will render the new view

5. The builder is responsible for integrating render and edit into the builder, rendering render on the canvas, and editing on the element configuration panel

......

### The overall idea of the project's release design is as follows

1. The publishing page is composed of one HTML and multiple JS files. Although there are multiple JS resources, they can be integrated into one JS file or directly placed in the HTML script

2. The publishing page needs to support micro front-end deployment, and the things to be built will be embedded into other applications, so it needs to support the published JS including DOM Render

3. The JS resource consists of several parts: building data (the aforementioned Array, which is applied to both the builder and the published content), component data (corresponding to the components applied in the Array, which includes the rendering content of the components), rendering JS (the JS code that combines the Array with the components to convert the View), rendering to DOM (DOM Render, which binds the View to the specified DOM)


4. The process of publishing is to implement step three, which integrates various resources together, generates JS, generates HTML, binds JS to HTML, and then exports it

......