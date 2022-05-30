# CountEverest
Get your own easily customizable countdown script without any further JS knowledge! Count Everest is quickly integrated into your own markup. It’s extendable with callback functions, provides many options (e.g.: left-hand zeros), and comes with an easy-to-follow documentation. Localize it within seconds. Use your own font. And enjoy it even in Internet Explorer. We can’t wait to see what you create with it.

## Quick installation
Step 1: Choose and edit one of the theme.html files
Choose the ```theme-*.html``` that suits you best and open it to set your target date for the countdown at the end of the file.

Step 2: Upload files
Upload all files and folders via FTP to your webserver.

Step 3: Test it in your browser
Open the ```theme-*.html``` that you have chosen in your favourite browser. Done!

## Advanced installation (for developers)
### Step 1: Link required files
The Count Everest Plugin is based on jQuery, so it's important that you load it right after the jQuery library.

```
<!-- Load jQuery library -->
<script src="js/vendor/jquery-1.11.2.min.js">

<!-- Load Count Everest jQuery Plugin after jQuery library -->
<script src="js/vendor/jquery.counteverest.min.js">
```
### Step 2: Create HTML markup
By default you can use the following HTML markup. The surrounding ```<div class="countdown">``` is needed for calling the plugin. Every ```<span>``` element representing a time unit and the corresponding label. If you don't want one of them, remove it! Of course you can use your own markup. Just define the sizzle selectors by using the [options](https://www.mediacoop.fr/sites/all/modules/glazed_builder/glazed_builder/vendor/counteverest/doc/#options).
```
<div class="countdown">
	<span class="ce-days"></span> <span class="ce-days-label"></span>
	<span class="ce-hours"></span> <span class="ce-hours-label"></span>
	<span class="ce-minutes"></span> <span class="ce-minutes-label"></span>
	<span class="ce-seconds"></span> <span class="ce-seconds-label"></span>
</div>
```
### Step 3: Call the countEverest
Now call the ```countEverest``` method on ```<div class="countdown">```. Note that the call must be inside the ```$(document).ready()```.
```
$(document).ready(function() {
	$('.countdown').countEverest({
		day: 1,
		month: 1,
		year: 2015
	});
});
```
### Step 4: Customization
See the following sections with several [examples](https://www.mediacoop.fr/sites/all/modules/glazed_builder/glazed_builder/vendor/counteverest/doc/#examples), [options](https://www.mediacoop.fr/sites/all/modules/glazed_builder/glazed_builder/vendor/counteverest/doc/#options), [API methods](https://www.mediacoop.fr/sites/all/modules/glazed_builder/glazed_builder/vendor/counteverest/doc/#api-methods) and [callback functions](https://www.mediacoop.fr/sites/all/modules/glazed_builder/glazed_builder/vendor/counteverest/doc/#callback-functions) to customize your countdown.
