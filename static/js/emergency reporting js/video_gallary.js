document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Elements ---
  const menuButton = document.getElementById("menu-button");
  const mobileNav = document.getElementById("mobile-nav");
  const closeNavButton = document.getElementById("close-nav-button");
  const categoryFiltersContainer = document.getElementById("category-filters");
  const videoGrid = document.getElementById("video-grid");
  const searchInput = document.getElementById("search-input");
  const noResultsMessage = document.getElementById("no-results-message");

  // --- Video Data (using provided YouTube video IDs) ---
  const videoData = [
    {
      id: "v1",
      title: "Fire Safety Basics",
      category: "Fire",
      description:
        "Essential tips for preventing fires and what to do in case of a small fire.",
      videoId: "V4x1BhsrZeY",
      type: "youtube",
    },
    {
      id: "v2",
      title: "Road Accident Response",
      category: "Accident",
      description:
        "A guide on how to safely respond to a road traffic accident and assist victims.",
      videoId: "FubZWxLnfd8",
      type: "youtube",
    },
    {
      id: "v3",
      title: "Flood Preparedness in Nigeria",
      category: "Flood",
      description:
        "Important steps to take before, during, and after a flood in Nigerian communities.",
      videoId: "IisqrLOnqX8",
      type: "youtube",
    },
    {
      id: "v4",
      title: "Emergency Medical First Aid",
      category: "Medical",
      description:
        "Basic first aid techniques for common medical emergencies like cuts and burns.",
      videoId: "MNvGqxAIGFo",
      type: "youtube",
    },
    {
      id: "v5",
      title: "Security Awareness Tips",
      category: "Security",
      description:
        "Tips for personal security and reporting suspicious activities to authorities.",
      videoId: "IisqrLOnqX8",
      type: "youtube",
    },
    {
      id: "v6",
      title: "Building Collapse Evacuation",
      category: "Building Collapse",
      description:
        "What to do if you are in or near a collapsing building. Safety protocols.",
      videoId: "V4x1BhsrZeY",
      type: "youtube",
    },
    {
      id: "v7",
      title: "Natural Disaster Survival",
      category: "Disaster Prep",
      description:
        "General guidelines for surviving various natural disasters common in Nigeria.",
      videoId: "FubZWxLnfd8",
      type: "youtube",
    },
    {
      id: "v8",
      title: "Home Emergency Evacuation Plan",
      category: "Preparedness",
      description:
        "Creating and practicing an effective evacuation plan for your home and family.",
      videoId: "MNvGqxAIGFo",
      type: "youtube",
    },
    {
      id: "v9",
      title: "Traffic Management and Safety",
      category: "Accident",
      description:
        "Understanding FRSC roles and tips for safe driving on Nigerian roads.",
      videoId: "IisqrLOnqX8",
      type: "youtube",
    },
    {
      id: "v10",
      title: "Community First Responders",
      category: "Preparedness",
      description:
        "Training and role of community members in initial emergency response.",
      videoId: "V4x1BhsrZeY",
      type: "youtube",
    },
  ];

  let activeCategory = "All"; // Keeps track of the currently active filter category
  let searchTimeout; // For debouncing the search input

  // --- Helper Functions ---

  // Debounce function to limit how often a function is called
  function debounce(func, delay) {
    return function (...args) {
      const context = this;
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => func.apply(context, args), delay);
    };
  }

  // Function to highlight search terms
  function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) {
      return text;
    }
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(regex, '<span class="highlight">$1</span>');
  }

  // Function to generate video cards
  function createVideoCard(video, searchTerm = "") {
    const videoCard = document.createElement("div");
    videoCard.classList.add("video-card");

    let videoEmbedHtml = "";
    if (video.type === "youtube") {
      videoEmbedHtml = `
                        <div class="video-embed-container">
                            <iframe
                                src="https://www.youtube.com/embed/${video.videoId}?autoplay=0&rel=0&modestbranding=1"
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerpolicy="strict-origin-when-cross-origin"
                                allowfullscreen
                            ></iframe>
                        </div>
                    `;
    }

    // Apply highlighting to title and description
    const highlightedTitle = highlightSearchTerm(video.title, searchTerm);
    const highlightedDescription = highlightSearchTerm(
      video.description,
      searchTerm
    );

    videoCard.innerHTML = `
                    ${videoEmbedHtml}
                    <div class="video-info">
                        <h3 class="video-title">${highlightedTitle}</h3>
                        <p class="video-category">Category: ${video.category}</p>
                        <p class="video-description">${highlightedDescription}</p>
                    </div>
                `;
    return videoCard;
  }

  // Function to render videos based on filters
  window.filterVideos = (category = activeCategory) => {
    const searchTerm = searchInput.value.toLowerCase();

    // Update active category button
    const buttons = categoryFiltersContainer.querySelectorAll(".filter-button");
    buttons.forEach((button) => {
      if (button.dataset.category === category) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
    activeCategory = category; // Update global active category

    // Filter videos
    const filteredVideos = videoData.filter((video) => {
      const matchesCategory =
        activeCategory === "All" || video.category === activeCategory;
      const matchesSearch =
        video.title.toLowerCase().includes(searchTerm) ||
        video.description.toLowerCase().includes(searchTerm);
      return matchesCategory && matchesSearch;
    });

    // Clear current videos
    videoGrid.innerHTML = "";

    // Display filtered videos or no results message
    if (filteredVideos.length > 0) {
      filteredVideos.forEach((video) => {
        videoGrid.appendChild(createVideoCard(video, searchTerm)); // Pass searchTerm for highlighting
      });
      noResultsMessage.classList.add("hidden");
    } else {
      noResultsMessage.classList.remove("hidden");
    }
  };

  // Debounced version of filterVideos
  // Make debouncedFilterVideos globally accessible
  window.debouncedFilterVideos = debounce(window.filterVideos, 300); // 300ms delay

  // Function to populate category filter buttons
  function populateCategoryFilters() {
    const categories = new Set(videoData.map((video) => video.category));
    categories.forEach((category) => {
      const button = document.createElement("button");
      button.classList.add("filter-button");
      button.setAttribute("data-category", category);
      button.textContent = category;
      button.onclick = () => window.filterVideos(category); // Call through window object
      categoryFiltersContainer.appendChild(button);
    });
  }

  // --- Event Listeners ---

  // Mobile Navigation Toggle
  if (menuButton && mobileNav) {
    menuButton.addEventListener("click", () => {
      mobileNav.classList.add("open");
      menuButton.setAttribute("aria-expanded", "true");
    });
  }

  if (closeNavButton && mobileNav) {
    closeNavButton.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  }

  // Initial setup
  populateCategoryFilters(); // Create category buttons
  window.filterVideos(); // Initially display all videos (call through window object)
});
