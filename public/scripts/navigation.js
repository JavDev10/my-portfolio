// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
	const navButtons = document.querySelectorAll('.nav-button');
	const contentSections = document.querySelectorAll('.content-section');
	const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
	const mobileNavigation = document.getElementById('mobile-navigation');
	const bodyModule = document.querySelector('.body-content');

	// Function to trigger fade-in animation
	function triggerFadeIn() {
		if (bodyModule) {
			// Reset animation by removing class first
			bodyModule.classList.remove('fade-in');
			// Force reflow
			bodyModule.offsetHeight;
			// Add class to trigger animation
			bodyModule.classList.add('fade-in');
		}
	}

	// Trigger fade-in on page load
	triggerFadeIn();

	// Navigation functionality
	navButtons.forEach(button => {
		button.addEventListener('click', function() {
			const targetSection = this.getAttribute('data-section');

			// Remove active class from all buttons
			navButtons.forEach(btn => btn.classList.remove('active'));

			// Add active class to clicked button
			this.classList.add('active');

			// Hide all content sections
			contentSections.forEach(section => {
				section.classList.add('hidden');
			});

			// Show target content section
			const targetContent = document.getElementById(targetSection + '-content');
			if (targetContent) {
				targetContent.classList.remove('hidden');
			}

			// Close mobile menu after selection
			if (mobileNavigation) {
				mobileNavigation.classList.remove('active');
				mobileMenuToggle?.classList.remove('active');
			}
		});
	});

	// Mobile menu toggle functionality
	if (mobileMenuToggle && mobileNavigation) {
		mobileMenuToggle.addEventListener('click', function() {
			mobileNavigation.classList.toggle('active');
			this.classList.toggle('active');
		});

		// Close mobile menu when clicking outside
		document.addEventListener('click', function(event) {
			const target = event.target;
			if (!mobileNavigation.contains(target) && !mobileMenuToggle.contains(target)) {
				mobileNavigation.classList.remove('active');
				mobileMenuToggle.classList.remove('active');
			}
		});
	}
});