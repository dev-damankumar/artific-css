var getNextSibling = function (elem, selector) {
	var sibling = elem.nextElementSibling;
	while (sibling) {
		if (sibling.matches(selector)) return sibling;
		sibling = sibling.nextElementSibling
	}
};

let previousOpened = [...document.querySelectorAll("[data-accordion].open")]
previousOpened.forEach(v => {
	let panel=v.querySelector(".accordion-panel")
	panel.style.height=panel.scrollHeight+"px"
	panel.style.padding="var(--accordion-padding)"
})
document.body.addEventListener("click", function (e) {
	function resetDropdown(el, dropdown) {
		console.log(e.target)
		if (e.target.closest(".dropdown-menu")) return
		el.setAttribute("data-dropdown-open", false)
		el.style.transform = "scale(0)"
		el.style.opacity = "0"
		el.style.visibility = "hidden"
		dropdown.classList.remove("dropdown-open")
	}

	function resetMenu(el) {
		el.setAttribute("data-menu-open", false)
		el.style.right = "-400px"
	}

	if (e.target.getAttribute("data-toggle") === "dropdown" || e.target.closest(`[data-toggle="dropdown"]`)) {
		/*dropdown*/
		e.preventDefault()
		var dropdown = e.target

		if (e.target.closest(`[data-toggle="dropdown"]`)) {
			dropdown = e.target.closest(`[data-toggle="dropdown"]`)
		}

		var dropdowns = [...document.querySelectorAll(`[data-dropdown-open]`)]
		dropdowns.forEach(v => {
			if (v.parentElement.querySelector(`[data-toggle="dropdown"]`) !== dropdown) {
				if (document.querySelector(".dropdown-open")) {
					document.querySelector(".dropdown-open").classList.remove("dropdown-open")
				}
				resetDropdown(v, dropdown)
			}
		})
		var dropdownMenu = getNextSibling(dropdown, ".dropdown-menu")
		if (dropdownMenu) {
			if (dropdownMenu.getAttribute("data-dropdown-open") == "true") {
				resetDropdown(dropdownMenu, dropdown)
			} else {
				dropdown.classList.add("dropdown-open")
				dropdownMenu.setAttribute("data-dropdown-open", true)
				dropdownMenu.style.transform = "scale(1)"
				dropdownMenu.style.opacity = "1"
				dropdownMenu.style.visibility = "visible"
			}
		}
	} else {
		var dropdowns = [...document.querySelectorAll(`[data-dropdown-open]`)]
		dropdowns.forEach(v => {
			resetDropdown(v, v.parentElement.querySelector(`[data-toggle="dropdown"]`))
		})
		if (!e.target.closest(`[data-menu]`) || (e.target.hasAttribute(`[data-menu-close]`) || e.target.closest(`[data-menu-close]`))) {
			var menu = [...document.querySelectorAll(`[data-menu-open]`)]
			menu.forEach(v => {
				resetMenu(v)
			})
		}
	}


	if (e.target.getAttribute("data-toggle") === "modal" || e.target.closest(`[data-toggle="modal"]`)) {
		e.preventDefault()
		var modalBtn = e.target

		if (e.target.closest(`[data-toggle="modal"]`)) {
			modalBtn = e.target.closest(`[data-toggle="modal"]`)
		}
		let id = modalBtn.dataset.target
		let modal = document.querySelector(`${id}`)
		modal.classList.add("modal-show")
		console.log("id", modal)
	}
	if (e.target.getAttribute("data-dismiss") === "modal" || e.target.closest(`[data-dismiss="modal"]`)) {
		e.preventDefault()
		var closeBtn = e.target

		if (e.target.closest(`[data-dismiss="modal"]`)) {
			closeBtn = e.target.closest(`[data-dismiss="modal"]`)
		}
		closeBtn.closest(".modal").classList.remove("modal-show")
	}

	if (e.target.getAttribute("data-dismiss") === "alert" || e.target.closest(`[data-dismiss="alert"]`)) {
		e.preventDefault()
		var closeBtn = e.target

		if (e.target.closest(`[data-dismiss="alert"]`)) {
			closeBtn = e.target.closest(`[data-dismiss="alert"]`)
		}
		closeBtn.closest(".alert").style.display = "none"
	}
	if (e.target.getAttribute("data-toggle") === "menu" || e.target.closest(`[data-toggle="menu"]`)) {
		e.preventDefault()
		var menuToggleBtn = e.target

		if (e.target.closest(`[data-toggle="menu"]`)) {
			menuToggleBtn = e.target.closest(`[data-toggle="menu"]`)
		}
		let menu = menuToggleBtn.parentElement.querySelector("[data-menu]")
		menu.classList.add("menu-open")
	}

	if (e.target.getAttribute("data-toggle") === "accordion" || e.target.closest(`[data-toggle="accordion"]`)) {
		e.preventDefault()
		var accordionHeader = e.target


		if (e.target.closest(`[data-toggle="accordion"]`)) {
			accordionHeader = e.target.closest(`[data-toggle="accordion"]`)
		}

		let accordion = accordionHeader.closest(`[data-accordion]`);

		let panel=accordion.querySelector(".accordion-panel")
		console.log("panel",panel)
		let previousOpened = [...document.querySelectorAll("[data-accordion].open")]
		previousOpened.forEach(v => {
			if (v !== accordion) {
				let panel=v.querySelector(".accordion-panel")
				v.classList.remove("open")
				panel.style.padding="0 var(--accordion-padding) 0 var(--accordion-padding)"
				panel.style.height="0px"
			}
		})

		if(accordion.classList.contains("open")){
			panel.style.height="0px"
			panel.style.padding="0 var(--accordion-padding) 0 var(--accordion-padding)"
		}else{
			panel.style.height=panel.scrollHeight+"px"
			panel.style.padding="var(--accordion-padding)"
		}
		accordion.classList.toggle("open")


		console.log("panel",panel)

	}

	if (e.target.getAttribute("data-toggle") === "tab" || e.target.closest(`[data-toggle="tab"]`)) {
		e.preventDefault()
		var tab = e.target

		if (e.target.closest(`[data-toggle="tab"]`)) {
			tab = e.target.closest(`[data-toggle="tab"]`)
		}

		let id = tab.getAttribute("href")
		console.log("id", id)
		let tabContent = document.querySelector(id)

		let previousOpened = [...document.querySelectorAll(".tab-open")]
		previousOpened.forEach(v => {
			if (v !== tabContent) {
				v.classList.remove("tab-open")
			}
		})
		let previousOpenedTab = [...document.querySelectorAll(".nav-item.active")]
		previousOpenedTab.forEach(v => {
			if (v !== tab) {
				v.classList.remove("active")
			}
		})
		tab.closest(".nav-item").classList.add("active")
		tabContent.classList.add("tab-open")

	}

	if (e.target.getAttribute("data-menu-close") || e.target.closest(`[data-menu-close]`)) {
		e.preventDefault()
		var menuCloseBtn = e.target

		let menu = menuCloseBtn.closest("[data-menu]")
		menu.classList.remove("menu-open")
	}
	if (e.target.classList.contains("modal")) {
		e.preventDefault()

		if (e.target.getAttribute("data-dismiss-self")) {
			e.target.classList.remove("modal-show")
		} else {
			e.target.classList.add("shake")
			setTimeout(() => {
				e.target.classList.remove("shake")
			}, 500)
		}

	}
})


var tooltips = [...document.querySelectorAll("[data-tooltip]")];
tooltips.forEach(t => {
	let placement=t.dataset.tooltipPlacement
	let placementClass=`tooltip-${placement}`
	let theme=`tooltip-${t.dataset.tooltipTheme?t.dataset.tooltipTheme:""}`
	var o = t.dataset.tooltip;
	if(o){
		var	l = `<div class="tooltip ${placement?placementClass:""} ${theme}">${o}</div>`;
		t.innerHTML += l
	}
})


let rgbaToHsla= function (r, g, b, a) {
	r /= 255;
	g /= 255;
	b /= 255;

	let cmin = Math.min(r, g, b),
		cmax = Math.max(r, g, b),
		delta = cmax - cmin,
		h = 0,
		s = 0,
		l = 0;
	if (delta == 0) {
		h = 0;
	} else if (cmax == r) {
		h = ((g - b) / delta) % 6;
	} else if (cmax == g) {
		h = (b - r) / delta + 2;
	} else {
		h = (r - g) / delta + 4;
	}

	h = Math.round(h * 60);


	if (h < 0) {
		h += 360;
	}

	l = (cmax + cmin) / 2;


	s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));


	s = +(s * 100).toFixed(1);
	l = +(l * 100).toFixed(1);

	return {
		value:"hsl(" + h + "," + s + "%," + l + "%," + a + ")",
		data:{
			h,s,l,a:Number(a.trim())
		}
	};
}
let mouseDown=false
window.addEventListener("mousedown", e => {
	mouseDown=true
	const target = e.target;
	let initial=target.style.cssText
	if((target.hasAttribute("data-ripple") || target.nodeName === "BUTTON") && !(target.hasAttribute("data-ripple-disabled") || target.classList.contains("btn-loading") || target.classList.contains("btn-loading-grow") || target.classList.contains("btn-link")|| target.classList.contains("btn-disabled") || target.hasAttribute("disabled") || target.closest("[disabled]") || target.closest("[read-only]")))  {
		show_ripple(e,target,false,initial);
	}
});
window.addEventListener("focusin", e => {
	if(!mouseDown){
		const target = e.target
		let initial=target.style.cssText
		if((target.hasAttribute("data-ripple") || target.nodeName === "BUTTON") && !(target.hasAttribute("data-ripple-disabled") || target.classList.contains("btn-loading") || target.classList.contains("btn-loading-grow") || target.classList.contains("btn-link")|| target.classList.contains("btn-disabled") || target.hasAttribute("disabled") || target.closest("[disabled]") || target.closest("[read-only]")))  {
			show_ripple(e,target,true,initial);
		}
	}
});
function show_ripple(e,button,focus,initial) {
	e.stopImmediatePropagation()
	e.stopPropagation()
	button.style.overflow="hidden"
	const style = getComputedStyle(button);
	let backgroundColor=style['backgroundColor']||""

	if(backgroundColor==="rgba(0, 0, 0, 0)" && !style["background"].includes("gradient")){
		backgroundColor="rgb(255, 255, 255)"
	}
	if(backgroundColor.startsWith("rgb")){
		backgroundColor=backgroundColor.replace(/^\w*/gm,"").replace(/[(|)]/g,"")
		var [r,g,b,a]=backgroundColor.split(",")
		var hslColor=rgbaToHsla(r,g,b,a?a:'1')
	}

	let ripple_elmnt = document.createElement("span");
	let diameter = Math.max(parseInt(style.height), parseInt(style.width)) * 1.5;
	let radius = diameter / 2;

	ripple_elmnt.className = "ripple";
	ripple_elmnt.style.height = ripple_elmnt.style.width = diameter + "px";
	ripple_elmnt.style.position = "absolute";
	ripple_elmnt.style.borderRadius = "1000px";
	ripple_elmnt.style.pointerEvents = "none";

	ripple_elmnt.style.left = e.offsetX - radius  + "px";
	ripple_elmnt.style.top = e.offsetY - radius + "px";
	if(focus){
		ripple_elmnt.style.left = 10 - radius  + "px";
		ripple_elmnt.style.top = 5 - radius + "px";
	}
	ripple_elmnt.style.transform = "scale(0)";
	ripple_elmnt.style.transformOrigin = "center";
	ripple_elmnt.style.transition = "transform 500ms ease, opacity 400ms ease";
	ripple_elmnt.style.background = `hsl(${hslColor?.data?.h}deg,${hslColor?.data?.s}%,${(hslColor?.data?.l > 60) ? "80%":"100%"},0.3)`;

	button.appendChild(ripple_elmnt);

	setTimeout(() => {
		ripple_elmnt.style.transform = "scale(1)";
	}, 10);

	button.addEventListener("mouseup", e => {
		ripple_elmnt.style.opacity = 0;
		setTimeout(() => {
			try {
				button.style=initial
				button.removeChild(ripple_elmnt);
				mouseDown=false
			} catch(er) {}
		}, 400);
	}, {once: true});
	button.addEventListener("blur", e => {
		ripple_elmnt.style.opacity = 0;
		setTimeout(() => {
			try {
				button.style=initial
				button.removeChild(ripple_elmnt);
				mouseDown=false
			} catch(er) {}
		}, 450);
	}, {once: true});
}
