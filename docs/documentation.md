# Core
<hr>
<ol>
	<li>
		undo <= redrawing everything of the array of paths. 
	</li>
	<li>
		mousemove displaying <= drawing a temporary path, when mouseup call clearRect. 
	</li>
	<li>
		stick <= call assign_previous in md_ func
	</li>
	<li>
		keyboard shortcut <= isolate inputbox and all other stuff by variable assignment
	</li>
	<li>
		panel <= trigger css vis and hid class
	</li>
	<li>
		polygon <= even: diagonal (0 || n/2); odd: extended diagonal (0 || center(n/2, (n/2)+1), 1 || center((n/2)+1, (n/2)+2)). triangle n=3 is a special case, the (0 || (1, 2)), (1 || (2, 0))
	</li>
</ol>
<br /><br />

# introduction
<hr>
<p>There are three kinds of apps, 
</p>
<ol>
	<li>
		drawing element: free hand, point sketch, rectangle, polygon, two point circle, circle, bezier curve; 
	</li>
	<li>
		afterwards: move, rotate, scale; 
	</li>
	<li>
		clear: eraser, sweep; 
	</li>
</ol>
<p>
	each of the drawing element carries properties of points, name, linestyle, graient, filling, center, linewidth. These are stored in separate arrays. Undo function splice each one when triggered. Afterwards are different, each of the element is stored in variable defined as moved. 
</p>
<br /><br />

# how to add new drawing App?
<hr>
<ol>
	<li>
		get an icon, resize it to 50x50 pixels, default to jpg, dump into the img folder.  
	</li>
	<li>
		open `draw.html`, add one more into div option, add tooltip if you want. 
	</li>
	<li>
		open `draw.css`, add background image. 
	</li>
	<li>
		open `draw.js`, use const to collect your app, add listen to click, if clicked, set the mode (better to increment 1 from last one), remember to call turn_off() and assign esp and isolate. 
	</li>
	<li>
		define a op_ function, which draws the element based on mouse vertex. 
	</li>
		define md_, mm_, mu_ fuctions, which are mousedown, mousemove and mouseup. 
	<li>
		integrate defined function into mm(), md() and mu(). 
	</li>
	<li>
		integrate op_ into drawPaths()
	</li>
	<li>
		To fit undo function, you must have a global variable that stores past conduction of your app. Integrate your app into clear and undo functions.
	</li>
</ol>
<br /><br />

# how to add new base App?
<hr>
<ol>
	<li>
		get an icon, resize it to 50x50 pixels, default to jpg, dump into the img folder.  
	</li>
	<li>
		open `draw.html`, add one more into div option, add tooltip if you want. 
	</li>
	<li>
		open `draw.css`, add background image. 
	</li>
	<li>
		open `draw.js`, use const to collect your app, add listen to click, if clicked, set the mode (better to increment 1 from last one), remember to call turn_off() and assign esp and isolate. 
	</li>
	<li>
		define mm_, mu_ fuctions, which are mousemove and mouseup. 
	<li>
		integrate defined function into mm(), md() and mu(), in md, call md_base; 
	</li>
</ol>
<br /><br />
