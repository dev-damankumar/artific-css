var getNextSibling = function (elem, selector) {
	var sibling = elem.nextElementSibling;
	while (sibling) {
		if (sibling.matches(selector)) return sibling;
		sibling = sibling.nextElementSibling
	}
};
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
		let previousOpened = [...document.querySelectorAll("[data-accordion].open")]
		previousOpened.forEach(v => {
			if (v !== accordion) {
				v.classList.remove("open")
			}

		})

		accordion.classList.toggle("open")

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
