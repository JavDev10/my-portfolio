// Navigation functionality
function initNavigation() {
	const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
	const mobileNavigation = document.getElementById('mobile-navigation');
	const bodyModule = document.querySelector('.body-content');

	// Function to trigger fade-in animation
	if (bodyModule) {
		// Reset animation by removing class first
		bodyModule.classList.remove('fade-in');
		// Force reflow
		void bodyModule.offsetHeight;
		// Add class to trigger animation
		bodyModule.classList.add('fade-in');
	}

	// Mobile menu toggle functionality
	if (mobileMenuToggle && mobileNavigation) {
		// Remove old event listeners to avoid duplicates if any
		const newToggle = mobileMenuToggle.cloneNode(true);
		mobileMenuToggle.parentNode.replaceChild(newToggle, mobileMenuToggle);

		newToggle.addEventListener('click', function () {
			mobileNavigation.classList.toggle('active');
			this.classList.toggle('active');
		});

		// Close mobile menu when clicking outside
		document.addEventListener('click', function (event) {
			const target = event.target;
			if (!mobileNavigation.contains(target) && !newToggle.contains(target)) {
				mobileNavigation.classList.remove('active');
				newToggle.classList.remove('active');
			}
		});
	}
}

// Run on initial load and after every navigation
document.addEventListener('astro:page-load', initNavigation);