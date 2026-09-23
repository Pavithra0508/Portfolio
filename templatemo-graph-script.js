/* =========================================================
   TEMPLATE MO - GRAPH PAGE
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       MOBILE MENU
    ========================================================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav");
    const navLinks = document.querySelectorAll("nav a");

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", function () {
            nav.classList.toggle("active");
            menuToggle.classList.toggle("active");
        });
    }

    /* Close menu after clicking a navigation link */
    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            if (nav) {
                nav.classList.remove("active");
            }

            if (menuToggle) {
                menuToggle.classList.remove("active");
            }
        });
    });


    /* =========================================================
       NAVBAR SCROLL EFFECT
    ========================================================= */

    const navbar = document.querySelector(".navbar");

    function handleNavbarScroll() {
        if (!navbar) {
            return;
        }

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleNavbarScroll);

    handleNavbarScroll();


    /* =========================================================
       ACTIVE NAVIGATION LINK
    ========================================================= */

    const sections = document.querySelectorAll("section[id]");

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(function (link) {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === "#" + currentSection) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveNavigation);

    updateActiveNavigation();


    /* =========================================================
       SMOOTH SCROLLING
    ========================================================= */

    navLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetSection = document.querySelector(targetId);

            if (targetSection) {

                event.preventDefault();

                const offset = 80;

                const targetPosition =
                    targetSection.getBoundingClientRect().top +
                    window.pageYOffset -
                    offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });


    /* =========================================================
       SLIDE UP ANIMATION
    ========================================================= */

    const style = document.createElement("style");

    style.textContent = `
        @keyframes slideUp {

            from {
                transform: scaleY(0);
                transform-origin: bottom;
            }

            to {
                transform: scaleY(1);
                transform-origin: bottom;
            }

        }

        .slide-up-animation {
            animation: slideUp 1s ease forwards;
        }
    `;

    document.head.appendChild(style);


    /* =========================================================
       MINI CHART
    ========================================================= */

    const miniChart = document.querySelector(".mini-chart");

    if (miniChart) {

        const bars = miniChart.querySelectorAll(".bar");

        bars.forEach(function (bar, index) {

            bar.style.transform = "scaleY(0)";
            bar.style.transformOrigin = "bottom";

            setTimeout(function () {

                bar.style.transition = "transform 0.6s ease";
                bar.style.transform = "scaleY(1)";

            }, index * 100);
        });
    }


    /* =========================================================
       BAR CHART ANIMATION
    ========================================================= */

    const chartBars = document.querySelectorAll(".chart-bar");

    if (chartBars.length > 0) {

        const observer = new IntersectionObserver(
            function (entries, observerInstance) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        const bars = entry.target.querySelectorAll(".chart-bar");

                        bars.forEach(function (bar, index) {

                            setTimeout(function () {

                                bar.style.transformOrigin = "bottom";
                                bar.style.animation =
                                    "slideUp 0.8s ease forwards";

                            }, index * 100);

                        });

                        observerInstance.unobserve(entry.target);
                    }
                });

            },
            {
                threshold: 0.2
            }
        );

        const chartContainer =
            document.querySelector(".chart-container");

        if (chartContainer) {
            observer.observe(chartContainer);
        }
    }


    /* =========================================================
       CHART OPTIONS
    ========================================================= */

    const chartOptions = document.querySelectorAll(".chart-option");

    chartOptions.forEach(function (option) {

        option.addEventListener("click", function () {

            chartOptions.forEach(function (item) {
                item.classList.remove("active");
            });

            option.classList.add("active");
        });
    });


    /* =========================================================
       CONTACT FORM
    ========================================================= */

    const contactForm = document.querySelector("#contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const submitButton =
                contactForm.querySelector('button[type="submit"]');

            if (submitButton) {

                const originalText = submitButton.textContent;

                submitButton.textContent = "Message Sent! ✓";
                submitButton.disabled = true;

                setTimeout(function () {

                    contactForm.reset();

                    submitButton.textContent = originalText;
                    submitButton.disabled = false;

                }, 2000);

            } else {

                contactForm.reset();

            }
        });
    }


    /* =========================================================
       CONTACT FORM INPUT EFFECT
    ========================================================= */

    const formInputs = document.querySelectorAll(
        "#contact-form input, #contact-form textarea"
    );

    formInputs.forEach(function (input) {

        input.addEventListener("focus", function () {
            input.classList.add("focused");
        });

        input.addEventListener("blur", function () {

            if (input.value.trim() === "") {
                input.classList.remove("focused");
            }
        });
    });


    /* =========================================================
       METRICS / COUNTER ANIMATION
    ========================================================= */

    const metrics = document.querySelectorAll(".metric-number");

    if (metrics.length > 0) {

        const metricObserver = new IntersectionObserver(
            function (entries, observerInstance) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const metric = entry.target;

                    const target =
                        parseInt(metric.getAttribute("data-value"), 10);

                    if (isNaN(target)) {
                        observerInstance.unobserve(metric);
                        return;
                    }

                    let current = 0;

                    const increment =
                        Math.max(1, Math.ceil(target / 50));

                    const counter = setInterval(function () {

                        current += increment;

                        if (current >= target) {

                            current = target;
                            clearInterval(counter);

                        }

                        metric.textContent = current;

                    }, 30);

                    observerInstance.unobserve(metric);
                });

            },
            {
                threshold: 0.5
            }
        );

        metrics.forEach(function (metric) {
            metricObserver.observe(metric);
        });
    }


    /* =========================================================
       INITIALIZE METRICS
    ========================================================= */

    metrics.forEach(function (metric) {

        const value = metric.getAttribute("data-value");

        if (value) {
            metric.textContent = "0";
        }
    });


    /* =========================================================
       CONSOLE MESSAGE
    ========================================================= */

    console.log("Portfolio JavaScript loaded successfully.");

});