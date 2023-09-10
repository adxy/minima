ForFile='index.html'

local json = require("json")

local projects_table = {
    email= "theadxy@gmail.com",
    openSource= {
      {
        title=
          "Fixed a bug on dev.to where search bar used to disappear on mobile devices.",
        prLink= "https=//github.com/forem/forem/pull/18909",
        languages= {"Preact"},
      },
      {
        title=
          "Improved rendering performance & backspace behavior on typer.barelyhuman.dev.",
        prLink= "https=//github.com/barelyhuman/typer/pull/4",
        languages= {"VanillaJs", "CSS"},
      },
    },
    socials= {
      { platform= "twitter", link= "https=//twitter.com/theadxy" },
      { platform= "github", link= "https=//github.com/adxy" },
      { platform= "linkedin", link= "https=//linkedin.com/in/adxy" },
    },
    projects= {
      {
        title= "ChessKhelo",
        brief= "An open source multiplayer chess platform built from scratch!",
        tags= {"NextJs", "CSS", "Socket.io", "NodeJs", "Express", "EC2"},
        link= "https=//chesskhelo.in",
        code= "https=//github.com/adxy/chesskhelo.in",
      },
      {
        title= "Minima",
        brief=
          "Personal portfolio website that you're seeing right now. Built with VanillaJs & CSS.",
        tags= {"VanillaJs", "CSS", "Parcel"},
        link= "https=//adxy.dev",
        code= "https=//github.com/adxy/minima",
      },
    },
  }

function Writer(source_data)
    return json.encode({
		data = projects_table,
	})
end
