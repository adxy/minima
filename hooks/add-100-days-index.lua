package.path = package.path .. ";../lib/?.lua"

ForFile = "challenges/100-days/index.html"

local lib = require("lib.utils")
local yaml = require("yaml")
local strings = require("strings")
local json = require("json")
local alvu = require("alvu")

local function sortByDay(postone, posttwo)
	return postone.day > posttwo.day
end

function Writer(filedata)
	local basePath = "pages/challenges/100-days"
	local files = alvu.files(basePath)
	local results = {}

	for file = 1, #files do
		if not string.find(files[file], "index.html") then
			local name = string.gsub(files[file], ".md", "")
			name = string.gsub(name, ".html", "")

			local filecontent = lib.getfiledata(basePath .. "/" .. files[file])

			if filecontent then
				local match = strings.split(filecontent, "---")

				if match[2] then
					local frontmatterParsed = yaml.decode(match[2])
					table.insert(results, {
						day = frontmatterParsed.day,
						gym = frontmatterParsed.gym,
						activity = frontmatterParsed.activity,
						learn = frontmatterParsed.learn,
						work = frontmatterParsed.work,
						diet = frontmatterParsed.diet,
					})
				end
			end
		end
	end

	table.sort(results, sortByDay)

	return json.encode({
		data = {
			days = results,
		},
	})
end
