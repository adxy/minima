package.path = package.path .. ";../lib/?.lua"

ForFile = "index.html"

local lib = require("lib.utils")
local yaml = require("yaml")
local strings = require("strings")
local json = require("json")
local alvu = require("alvu")

local projects_table = {
	email = "theadxy@gmail.com",
	openSource = {
		{
			title = "Fixed a bug on dev.to where search bar used to disappear on mobile devices.",
			prLink = "https://github.com/forem/forem/pull/18909",
			languages = { "Preact" },
		},
		{
			title = "Improved rendering performance & backspace behavior on typer.barelyhuman.dev.",
			prLink = "https://github.com/barelyhuman/typer/pull/4",
			languages = { "VanillaJs", "CSS" },
		},
		{
			title = "Added support for 404 (not found) page in alvu (a static site generator).",
			prLink = "https://github.com/barelyhuman/alvu/pull/7",
			languages = { "GoLang" },
		},
	},
	socials = {
		{ platform = "twitter", link = "https://twitter.com/theadxy" },
		{ platform = "github", link = "https://github.com/adxy" },
		{ platform = "linkedin", link = "https://linkedin.com/in/adxy" },
	},
	projects = {
		{
			title = "ChessKhelo",
			brief = "An open source multiplayer chess platform built from scratch!",
			tags = { "NextJs", "CSS", "Socket.io", "NodeJs", "Express", "EC2" },
			link = "https://chesskhelo.in",
			code = "https://github.com/adxy/chesskhelo.in",
			image = "chesskhelo.png",
			path = "chesskhelo",
		},
		{
			title = "Minima",
			brief = "Personal portfolio website that you're seeing right now. Built with VanillaJs & CSS.",
			tags = { "VanillaJs", "CSS", "Parcel" },
			link = "https://adxy.dev",
			code = "https://github.com/adxy/minima",
			image = "minima.png",
			path = "minima",
		},
		{
			title = "Xtension",
			brief = "A chrome extension that blocks Twitter/X videos while keeping a view video button.",
			tags = { "VanillaJs", "CSS", "Chrome Extension" },
			link = "https://chromewebstore.google.com/detail/xtwitter-feed-video-block/khdpmhkldgcomdhoclgcbhkaeeilaedm",
			code = "https://github.com/adxy/xtension",
			image = "xtension.png",
			path = "xtension",
		},
		{
			title = "Whattime.live",
			brief = "Coming Soon.",
			tags = { "NextJs", "NodeJs", "MongoDB" },
			link = "#",
			code = "#",
			image = "whattime.live.png",
			path = "whattime.live",
		},
	},
}
local function sortbydate(postone, posttwo)
	return postone.date > posttwo.date
end

function Writer(filedata)
	local basePath = "pages/writings"
	local files = alvu.files(basePath)
	local meta = {}

	for file = 1, #files do
		if not string.find(files[file], "index.html") then
			if not string.find(files[file], "_head.html") then
				local name = string.gsub(files[file], ".md", "")
				name = string.gsub(name, ".html", "")

				local filecontent = lib.getfiledata(basePath .. "/" .. files[file])

				if filecontent then
					local match = strings.split(filecontent, "---")

					if match[2] then
						local frontmatterParsed = yaml.decode(match[2])
						local date = lib.parse_dates(frontmatterParsed.date)
						if frontmatterParsed.published then
							if not frontmatterParsed.rss_only then
								table.insert(meta, {
									slug = name,
									title = frontmatterParsed.title,
									date = date,
									formatteddate = os.date("%d-%m-%Y", date),
								})
							end
						end
					end
				end
			end
		end
	end

	table.sort(meta, sortbydate)

	return json.encode({
		data = {
			writing = {
				pages = meta,
			},
			static = projects_table,
		},
	})
end
