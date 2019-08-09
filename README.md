# Gluten-Free and Vegan Food Guide
> Slug: VEGANXX

Preview: https://sandbox.pmn.arcpublishing.com/ellipsis/pb/preview/VXKJPCDPS5HVJIFQQDYDY5MNVU/
Notes from user testing, with recommendations for future improvements: https://docs.google.com/document/d/156KHh5hvrPBh0wuDjWmDnHIdTLWDNx62O_wm-ZRNxww/edit?usp=sharing

This project created a custom web guide to restaurants that offer vegan, dairy-free and gluten-free dishes in Philadelphia. The guide allows users to find restaurants that fit both their dietary restrictions and others' dietary restrictions in a user-friendly way by offering filters (vegan, gluten-free, dairy-free and carnivore friendly) and allowing users to jump among Philly neighborhoods. 



### Features


Unique features: 

* In order to simplify life for the reporters and editors, the content displayed on the guide feeds from three Google documents and spreadsheets, and this data is combined and error-checked in nunjucks.js. The data processing for this aspect is highly reusable for future food guides, as the template is very generalizable and EXTENSIVELY documented. 
* Data handling is error-tested and robust to mistakes reporters/editors might make in the Google documents
* In body HTML, I used Nunjucks.js if-blocks to make the web page robust to errors flexible to content changes. For example, if a restaurant has a second address, the code can display that, but otherwise it won't display anything. Same for missing phone numbers, missing menu links, missing text blurbs, etc. etc. etc.

Functions/components: 
* main.js: filtered list of restaurants
* jumpto.js: ensures smooth jumps from restaurants in list back up to the top of the filter and allows user to jump to different neighborhoods
* neighborhoods.js: outputs list of neighborhoods, linked to anchor tags for where those neighborhoods appear in th eguide


## Installing

Install this project by cloning from GitHub

```shell
git clone https://github.com/phillymedia/innovation-vegan-gf-guide.git
```

Install necessary packages:

```shell
npm install
```

### Configuration

Create the config json file:

```shell
cp config_example.json config.json
```

Edit `config.json ` and set the following values:

```
Update story_id with value for document that has restaurant copy
Update photo_sheet_id with id for sheet with photos
Update data_id with id for sheet with restaurant data
```

## Authorization
Helpful instructions written by @phillychris

You will need to create `credentials.json` and `token.json` files for Google OAuth2 authorization.

Steps:
* Visit Google's [APIs & Services dashboard](https://console.developers.google.com/apis/dashboard)
* Either create a new project or use an existing
  * There is a drop down (down arrow) in the upper left of the page, just to the right of the Google logo.
* The project you're using will be displayed in the upper left of the page. Make sure it's the project you want.
* Click on Library. Search for and enable the following:
  * Google Docs API					
  * Google Drive API					
  * Google Sheets API
* In the upper right there is a back arrow next to "API Library." Click it to return to the dashboard.
* You should see the libraries you added listed on the bottom of the page.
* Click Credentials
  * Click "Create credentials"
  * Select "OAuth client ID"
  * Select "Other" and click "Create"
  * Give it a name (default is fine)
  * Click the download icon next to these credentials
  * Copy that file into this directory, rename the file `credentials.json`
* Open a Terminal window, navigate to this directory, and run the command:
  * `node get_token.js`
  * Follow the instructions. There will be a URL posted that you will need to navigate to and enable this project.
  * Make sure you now have a file named `token.json`
* If you get an error:
  * Make sure there is not a file already named `token.json`. If there is, delete it.


## Development

Run the project locally with gulp:

(Note that it's important to first run gulp getJson)

```shell
gulp getJson
gulp
```

### Gulp Tasks

Create (or update) all JSON data for the project:

```
gulp getJson
```

Create (or update) just the Archie doc data:

```
gulp getArchie
```

Create (or update) just the Google Sheet data:

```
gulp getSheets
```

### Building

```shell
gulp build
```



### Deploying

After building, copy and paste code in dist/index.html into an Ellipsis HTML block with this line of JQuery script at the top: 

```
<script src="//www.philly.com/includes/e32121b31e345f561b84372c2bf06282/jquery-2.0.0b2.js" type="text/javascript"></script>
```

## Links

Update with all links for the project:

- Live link: 
- Live Ellipsis: https://sandbox.pmn.arcpublishing.com/ellipsis/#!/edit/VXKJPCDPS5HVJIFQQDYDY5MNVU/
- Staging Preview: https://stage.www.inquirer.com/preview/VXKJPCDPS5HVJIFQQDYDY5MNVU/ 
- Staging Ellipsis: https://sandbox.pmn.arcpublishing.com/ellipsis/pb/preview/VXKJPCDPS5HVJIFQQDYDY5MNVU/
- Archie Docs:
  - First Doc: https://drive.google.com/open?id=1p82wRB4jVtYNt3LfFLpYQxXmJ9ndhyjq5nHsQwHgOjM
- Spreadsheets
  - Data Sheet: https://drive.google.com/open?id=1EOcuULqPft4zMUo0cOsJ3cQ6Ch9SjOxzTrEgLRTN76M
  - Photo Sheet: https://drive.google.com/open?id=1roYfK1JD6FsTHzmV3k40PG62XgGuQSWDEXMiz-3hpRw
- Instructions for reporters on how to use Archie docs: https://drive.google.com/open?id=16Q_wOc76C6l2ZgLYgEZ-cwYzHSqfNUdRTJZ5ZyvVg7Y
- Folder with all documentation for project: https://docs.google.com/document/d/16Q_wOc76C6l2ZgLYgEZ-cwYzHSqfNUdRTJZ5ZyvVg7Y/edit?usp=sharing
