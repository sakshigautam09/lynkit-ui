document.addEventListener('DOMContentLoaded', function() {
    // Product information
    const productData = [
        {
            id: 1,
            name: 'Lynktrac',
            icon: 'fa-satellite',
            iconColor: '#FF6B35',
            type: 'tracking',
            description: 'Real-time shipment tracking and visibility across your entire supply chain with predictive analytics and automated alerts.',
            features: [
                'Real-time GPS tracking',
                'Predictive ETA calculation',
                'Temperature & condition monitoring',
                'Automated alerts & notifications'
            ],
            pricing: 'Custom',
            featured: true
        },
        {
            id: 2,
            name: 'Lynkflow',
            icon: 'fa-diagram-project',
            iconColor: '#4A90E2',
            type: 'management',
            description: 'Optimize workflow automation and process management across your supply chain operations with intelligent routing.',
            features: [
                'Workflow automation',
                'Document management',
                'Process optimization',
                'Compliance tracking'
            ],
            pricing: '$299/month',
            featured: false
        },
        {
            id: 3,
            name: 'Lynkware',
            icon: 'fa-warehouse',
            iconColor: '#34C759',
            type: 'management',
            description: 'Intelligent warehouse management with inventory optimization, automated fulfillment, and space optimization.',
            features: [
                'Smart inventory management',
                'Automated picking & packing',
                'Space optimization analytics',
                'Integration with robotics'
            ],
            pricing: '$499/month',
            featured: true
        },
        {
            id: 4,
            name: 'Lynkview',
            icon: 'fa-chart-line',
            iconColor: '#9B51E0',
            type: 'analytics',
            description: 'Comprehensive analytics and reporting dashboard for data-driven supply chain decisions with predictive insights.',
            features: [
                'Customizable dashboards',
                'Advanced analytics',
                'Predictive insights',
                'Real-time reporting'
            ],
            pricing: '$199/month',
            featured: false
        },
        {
            id: 5,
            name: 'Lynkconnect',
            icon: 'fa-network-wired',
            iconColor: '#FF9E6D',
            type: 'integration',
            description: 'Seamless integration platform connecting your supply chain partners and systems with API management.',
            features: [
                'API integration hub',
                'Partner onboarding tools',
                'Data standardization',
                'Secure data exchange'
            ],
            pricing: '$399/month',
            featured: true
        },
        {
            id: 6,
            name: 'Lynksecure',
            icon: 'fa-shield-halved',
            iconColor: '#FF8B35',
            type: 'management',
            description: 'End-to-end security and compliance management for your supply chain operations with blockchain verification.',
            features: [
                'Blockchain verification',
                'Compliance monitoring',
                'Risk assessment tools',
                'Audit trail generation'
            ],
            pricing: '$249/month',
            featured: false
        },
        {
            id: 7,
            name: 'Lynkoptimize',
            icon: 'fa-brain',
            iconColor: '#FF6B35',
            type: 'analytics',
            description: 'AI-powered optimization engine for route planning, inventory forecasting, and cost reduction.',
            features: [
                'AI route optimization',
                'Inventory forecasting',
                'Cost reduction analytics',
                'Scenario planning'
            ],
            pricing: '$599/month',
            featured: true
        },
        {
            id: 8,
            name: 'Lynkmobile',
            icon: 'fa-mobile-alt',
            iconColor: '#FF8B35',
            type: 'tracking',
            description: 'Mobile-first application for field agents, drivers, and warehouse staff with offline capabilities.',
            features: [
                'Mobile-first design',
                'Offline functionality',
                'Barcode scanning',
                'Digital signature capture'
            ],
            pricing: '$149/month',
            featured: false
        }
    ];

    // Comparison table details
    const comparisonInfo = [
        { feature: 'Real-time Tracking', lynktrac: true, lynkflow: false, lynkware: true, lynkview: true },
        { feature: 'Workflow Automation', lynktrac: false, lynkflow: true, lynkware: true, lynkview: false },
        { feature: 'Inventory Management', lynktrac: false, lynkflow: true, lynkware: true, lynkview: true },
        { feature: 'Analytics Dashboard', lynktrac: true, lynkflow: true, lynkware: true, lynkview: true },
        { feature: 'Predictive Insights', lynktrac: true, lynkflow: false, lynkware: true, lynkview: true },
        { feature: 'API Integration', lynktrac: true, lynkflow: true, lynkware: true, lynkview: true },
        { feature: 'Mobile App', lynktrac: true, lynkflow: true, lynkware: true, lynkview: false }
    ];

    // DOM elements
    const productListing = document.getElementById('productListing');
    const filterButtons = document.querySelectorAll('.filter-button');
    const compareTableBody = document.getElementById('compareBody');

    // Show products
    displayProducts(productData);
    
    // Show comparison table
    displayComparisonTable();

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active from all
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active to clicked
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter products
            let filteredProducts;
            if (filterValue === 'all') {
                filteredProducts = productData;
            } else {
                filteredProducts = productData.filter(product => product.type === filterValue);
            }
            
            // Display filtered products
            displayProducts(filteredProducts);
        });
    });

    // Function to display products
    function displayProducts(productsArray) {
        productListing.innerHTML = '';
        
        productsArray.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product-item';
            productElement.setAttribute('data-type', product.type);
            
            // Add featured badge if applicable
            const featuredBadge = product.featured ? '<span class="product-type" style="background-color: var(--lynkit-orange-light); color: var(--lynkit-white);">Most Popular</span>' : '';
            
            productElement.innerHTML = `
                <div class="product-top">
                    <div class="product-symbol" style="background-color: ${product.iconColor};">
                        <i class="fas ${product.icon}"></i>
                    </div>
                    <div class="product-title-wrap">
                        <div class="product-name">${product.name}</div>
                        <span class="product-type">${getTypeLabel(product.type)}</span>
                        ${featuredBadge}
                    </div>
                </div>
                <div class="product-body">
                    <p class="product-desc">${product.description}</p>
                    <ul class="product-features">
                        ${product.features.map(feature => `
                            <li><i class="fas fa-check-circle"></i> ${feature}</li>
                        `).join('')}
                    </ul>
                </div>
                <div class="product-bottom">
                    <div class="product-cost">
                        ${product.pricing} <span class="cost-label">/ month</span>
                    </div>
                    <button class="action-btn action-btn-main" data-product="${product.name}">Learn More</button>
                </div>
            `;
            
            productListing.appendChild(productElement);
        });
        
        // Add events to product buttons
        const productBtns = document.querySelectorAll('.product-item .action-btn-main');
        productBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const productName = this.getAttribute('data-product');
                alert(`You selected: ${productName}. This would go to the detailed product page.`);
            });
        });
    }

    // Function to display comparison table
    function displayComparisonTable() {
        compareTableBody.innerHTML = '';
        
        comparisonInfo.forEach(row => {
            const tableRow = document.createElement('tr');
            
            tableRow.innerHTML = `
                <td>${row.feature}</td>
                <td><i class="fas ${row.lynktrac ? 'fa-check feature-yes' : 'fa-times feature-no'}"></i></td>
                <td><i class="fas ${row.lynkflow ? 'fa-check feature-yes' : 'fa-times feature-no'}"></i></td>
                <td><i class="fas ${row.lynkware ? 'fa-check feature-yes' : 'fa-times feature-no'}"></i></td>
                <td><i class="fas ${row.lynkview ? 'fa-check feature-yes' : 'fa-times feature-no'}"></i></td>
            `;
            
            compareTableBody.appendChild(tableRow);
        });
    }

    // Helper function to get type label
    function getTypeLabel(type) {
        const labels = {
            'tracking': 'Tracking & Visibility',
            'management': 'Management',
            'analytics': 'Analytics',
            'integration': 'Integration'
        };
        
        return labels[type] || type;
    }

    // Events for CTA buttons
    const trialBtn = document.querySelector('.cta-actions .action-btn-main');
    const demoBtn = document.querySelector('.cta-actions .action-btn-outline');
    const learnBtn = document.querySelector('.ecosystem-highlight .action-btn-main');
    const salesBtn = document.querySelector('.action-buttons .action-btn-main');
    const loginBtn = document.querySelector('.action-buttons .action-btn-outline');

    trialBtn.addEventListener('click', function() {
        alert('This would begin a free trial of Lynkit products.');
    });

    demoBtn.addEventListener('click', function() {
        alert('This would open a calendar to book a product demo.');
    });

    learnBtn.addEventListener('click', function() {
        alert('This would go to the integration documentation page.');
    });

    salesBtn.addEventListener('click', function() {
        alert('This would open a contact form for the sales team.');
    });

    loginBtn.addEventListener('click', function() {
        alert('This would open the login page.');
    });
});