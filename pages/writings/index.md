<p class="title">Writings</p>
<p>Find all my articles, notes and everything I jot down here!</p>

<ul style="list-style-type: none">
{{range .Data.writing.pages}}
<li class="writings-card card">
<a  href="{{print  " /writings/" .slug ".html"}}">
<div class="description">{{ .title }}</div>
<div class="date">{{ .formatteddate }}</div>
</a>
</li>
{{end}}
</ul>
