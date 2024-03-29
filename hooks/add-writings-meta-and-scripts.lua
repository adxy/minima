package.path = package.path .. ";../lib/?.lua"

local json = require("json")
local strings = require("strings")

local mathJaxScript =
	"<script type='text/javascript' id='MathJax-script' async src='https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'></script>"

function Writer(filedata)
	local source_data = json.decode(filedata)
	if strings.contains(source_data.source_path, "pages/writings") then
		local name = string.gsub(source_data.name, ".md", "")
		name = string.gsub(name, ".html", "")

		if source_data.meta and source_data.meta.title then
			if source_data.meta.math then
				source_data.content = mathJaxScript .. "\n" .. source_data.content
			end

			source_data.content = "<h1 class='font-bold text-dark text-xl'> "
				.. source_data.meta.title
				.. "</h1>"
				.. "\n"
				.. source_data.content

			source_data.data = {
				html = {
					title = source_data.meta.title,
					description = source_data.meta.description,
					open_graph = {
						url = "/writings/" .. name,
						title = source_data.meta.title,
					},
				},
			}
		end
	end

	return json.encode(source_data)
end
