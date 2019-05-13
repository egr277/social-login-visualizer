## Welcome to GitHub Pages

You can use the [editor on GitHub](https://github.com/michael99man/social-login-visualizer/edit/master/README.md) to maintain and preview the content for your website in Markdown files.

Whenever you commit to this repository, GitHub Pages will run [Jekyll](https://jekyllrb.com/) to rebuild the pages in your site, from the content in your Markdown files.

### Markdown

Markdown is a lightweight and easy-to-use syntax for styling your writing. It includes conventions for

```markdown
Syntax highlighted code block

# Header 1
## Header 2
### Header 3

- Bulleted
- List

1. Numbered
2. List

**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
```

For more details see [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/).



<style>
	#mynetwork {
		width: 800px;
		height: 800px;
		border: 1px solid #444444;
		background-color: #222222;
	}
</style>

<script type="text/javascript" src="resources/vis.js"></script>
<script type="text/javascript" src="resources/data.js"></script>
<script type="text/javascript" src="resources/main.js"></script>
<link href="resources/vis-network.min.css" rel="stylesheet" type="text/css"/>

<body onload="drawNetwork()">
	<div id="mynetwork"></div>
</body>