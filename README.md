Adarsh's portfolio website.

`Built with VanillaJs & CSS without using any fancy libraries.`

## Why?
The current version of website [adxy.dev](https://adxy.dev) was too complicated visually and had too much going on, so I decided to make `Minima` [(beta.adxy.dev)](https://beta.adxy.dev).

## Lighthouse Score
Minima scores a perfect 100 in all fields.


![Lighthouse Scores](https://raw.githubusercontent.com/adxy/images/main/adxy.dev/lighthouse-score.png)


## Build tool
Minima uses [Alvu](https://barelyhuman.github.io/alvu/) to build it's code. 

## Run Locally

### 1. Install alvu

#### Quick

- You'll need `curl` installed on your system

```sh
curl -sf https://goblin.barelyhuman.xyz/github.com/barelyhuman/alvu | sh
```

#### From Source / Language tools

- You'll need go lang installed and its binary path added to your `PATH` env
  variable

```sh
# if go >= 1.8
go install github.com/barelyhuman/alvu
```

**or**

```sh
git clone https://github.com/barelyhuman/alvu
cd alvu 
go mod tidy 
go build 
go install
```
### 2. Clone and cd into dir

```
git clone git@github.com:adxy/minima.git
cd minima
```

### 3. Start alvu server

```
alvu -serve
```
The project should now be serving on `https://localhost:3000`
## Can I use this?
Feel free to fork it and make it your own!
