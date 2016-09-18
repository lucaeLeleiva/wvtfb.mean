## Views
- In this case are rendered with EJS(Embedded JavaScript) which has the following notation:

```<% Here goes the code that will be executed but not shown in the page %>```

```<%= Here goes the code that will be shown in the page, for example variable values %>```

- A note worthy function is include which is used like this:

```<%- include NameOfFile %>```

### Ilustration example:

```ejs
<%- include File %>
<% if(true){ %>
<p> <%= printableVariable %> </p>
<% } %>
```

- The previous code will print the following:

```html
<h1> I came from File </h1> <!-- Asuming the content of 'File' is <h1> I came from File </h1> -->
<p> I am a JS variable </p> <!-- Asuming the value of printableVariable is 'I am a JS variable' -->

```

### Extracted segment from nav.ejs as example:

```ejs
<% for(var i in messages) { %>
<div class="alert alert-warning alert-dismissible" role="alert">
    <strong>Warning!</strong> <%= messages[i] %>
</div>
<% } %>
```