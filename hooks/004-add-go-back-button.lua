package.path = package.path .. ";../lib/?.lua"

local json = require("json")
local strings = require("strings")

function Writer(filedata)
	local source_data = json.decode(filedata)

	if source_data.source_path == "pages/writings/index.md" then
		source_data.content = "<a href='/' class='go-back-button'> &#8592; home </a>"
			.. "\n" 
			.. source_data.content			
	elseif source_data.source_path:match("^pages/writings/") then
		source_data.content = "<a href='/writings' class='go-back-button'> &#8592; writings </a>"
			.. "\n" 
			.. source_data.content
			.. "\n" 
			.. "<a href='/writings' class='go-back-button'> &#8592; writings </a>"
	end

	if source_data.source_path:match("/projects/") then				
		source_data.content = "<a href='/' class='go-back-button'> &#8592; home </a>"
			.. "\n" 
			.. source_data.content
			.. "\n"
			.. "<a href='/projects' class='go-back-button'> &#8592; home </a>"
	end

	return json.encode(source_data)
end
