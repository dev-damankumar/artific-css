var getNextSibling = function (elem, selector) {
	var sibling = elem.nextElementSibling;
	while (sibling) {
		if (sibling.matches(selector)) return sibling;
		sibling = sibling.nextElementSibling
	}
};
document.body.addEventListener("click",function (e) {
	function resetDropdown(el,dropdown) {
		console.log(e.target)
		if(e.target.closest(".dropdown-menu")) return
		el.setAttribute("data-dropdown-open",false)
		el.style.transform="scale(0)"
		el.style.opacity="0"
		el.style.visibility="hidden"
		dropdown.classList.remove("dropdown-open")
	}
	function resetMenu(el) {
		el.setAttribute("data-menu-open",false)
		el.style.right="-400px"
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
				if(document.querySelector(".dropdown-open")){
					document.querySelector(".dropdown-open").classList.remove("dropdown-open")
				}
				resetDropdown(v,dropdown)
			}
		})
		var dropdownMenu = getNextSibling(dropdown, ".dropdown-menu")
		if (dropdownMenu) {
			if (dropdownMenu.getAttribute("data-dropdown-open") == "true") {
				resetDropdown(dropdownMenu,dropdown)
			} else {
				dropdown.classList.add("dropdown-open")
				dropdownMenu.setAttribute("data-dropdown-open", true)
				dropdownMenu.style.transform="scale(1)"
				dropdownMenu.style.opacity="1"
				dropdownMenu.style.visibility="visible"
			}
		}
	}
	else{
		var dropdowns=[...document.querySelectorAll(`[data-dropdown-open]`)]
		dropdowns.forEach(v=>{
			resetDropdown(v,v.parentElement.querySelector(`[data-toggle="dropdown"]`))
		})
		if(!e.target.closest(`[data-menu]`) || (e.target.hasAttribute(`[data-menu-close]`) || e.target.closest(`[data-menu-close]`))){
			var menu=[...document.querySelectorAll(`[data-menu-open]`)]
			menu.forEach(v=>{
				resetMenu(v)
			})
		}
	}
})