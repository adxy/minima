package.path = package.path .. ";../lib/?.lua"

local json = require("json")
local strings = require("strings")

function Writer(filedata)
	local source_data = json.decode(filedata)
	if strings.contains(source_data.source_path, "pages/challenges/100-days") then
		if source_data.meta and source_data.meta.day then
			source_data.content = "<h1 class='font-bold text-dark text-xl'> "
				.. "100 Day Challenge Day #"
				.. source_data.meta.day
				.. "</h1>"
				.. "\n"
				.. source_data.content
		end
	end

	return json.encode(source_data)
end
