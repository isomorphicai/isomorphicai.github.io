document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // Mobile Menu Navigation Toggle
    // ==========================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // ==========================================
    // Client Dashboard Console Tabs Switching
    // ==========================================
    const tabNavs = document.querySelectorAll('.db-nav li');
    const tabContents = document.querySelectorAll('.tab-content');

    tabNavs.forEach(nav => {
        nav.addEventListener('click', () => {
            const targetTab = nav.getAttribute('data-tab');

            // Set nav active state
            tabNavs.forEach(t => t.classList.remove('active'));
            nav.classList.add('active');

            // Set tab content active state
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `tab-${targetTab}`) {
                    content.classList.add('active');
                }
            });
        });
    });

    // ==========================================
    // Self-Service Training Memory & Database (University Themed)
    // ==========================================
    const customRules = {
        "fall admission": "Fall 2026 applications close on Nov 30th. Decisions are emailed in mid-January.",
        "hostel fees": "Hostel charges are ₹65,000 per semester, including dining plans."
    };

    const rulesTbody = document.getElementById('rules-tbody');
    const qaOverrideForm = document.getElementById('qa-override-form');

    function renderRulesTable() {
        if (!rulesTbody) return;
        rulesTbody.innerHTML = '';
        
        Object.entries(customRules).forEach(([query, response]) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><code>${query}</code></td>
                <td>"${response}"</td>
                <td><button class="delete-rule-btn" data-query="${query}">&times;</button></td>
            `;
            rulesTbody.appendChild(tr);
        });

        // Attach delete events
        document.querySelectorAll('.delete-rule-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const queryToDelete = btn.getAttribute('data-query');
                delete customRules[queryToDelete];
                renderRulesTable();
            });
        });
    }

    if (qaOverrideForm) {
        qaOverrideForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const questionVal = document.getElementById('override-q').value.trim();
            const answerVal = document.getElementById('override-a').value.trim();

            if (questionVal && answerVal) {
                const cleanKey = questionVal.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"");
                customRules[cleanKey] = answerVal;
                
                renderRulesTable();
                qaOverrideForm.reset();
                alert(`Rule Added! Custom override synced to your university chatbot configuration.`);
            }
        });
    }

    renderRulesTable();

    // ==========================================
    // Client Dashboard - Interactive Sources Toggle & Add
    // ==========================================
    const sourceList = document.getElementById('sources-list');

    if (sourceList) {
        sourceList.addEventListener('change', (e) => {
            if (e.target.classList.contains('source-toggle')) {
                const sourceItem = e.target.closest('.source-item');
                const statusSpan = sourceItem.querySelector('.source-status');
                const isChecked = e.target.checked;

                if (isChecked) {
                    sourceItem.classList.remove('disabled-source');
                    statusSpan.classList.add('active');
                    statusSpan.classList.remove('inactive');
                    if (sourceItem.textContent.includes('Website')) {
                        statusSpan.textContent = '142 pages indexed';
                    } else if (sourceItem.textContent.includes('Handbook')) {
                        statusSpan.textContent = '56 pages indexed';
                    } else if (sourceItem.textContent.includes('Fees')) {
                        statusSpan.textContent = '12 pages indexed';
                    } else {
                        statusSpan.textContent = 'Active';
                    }
                } else {
                    sourceItem.classList.add('disabled-source');
                    statusSpan.classList.remove('active');
                    statusSpan.classList.add('inactive');
                    statusSpan.textContent = 'Excluded';
                }
            }
        });

        const btnAddSource = document.getElementById('btn-add-source');
        btnAddSource.addEventListener('click', () => {
            const inputUrl = prompt("Enter a department URL or handbook file name to index:", "https://university.edu/financial-aid");
            if (inputUrl) {
                const parsedUrl = inputUrl.trim();
                let title = "Custom Knowledge Source";
                let iconClass = "doc-icon";
                let indexCountText = "1 page indexed";

                if (parsedUrl.startsWith('http://') || parsedUrl.startsWith('https://')) {
                    title = "Academic Web Directory";
                    iconClass = "web-icon";
                    indexCountText = "Multiple course nodes indexed";
                }

                const newSourceHtml = `
                    <div class="source-item" style="animation: fadeIn 0.4s ease forwards;">
                        <div class="source-info">
                            <div class="source-icon ${iconClass}"></div>
                            <div>
                                <span class="source-title">${title}</span>
                                <span class="source-url">${parsedUrl}</span>
                            </div>
                        </div>
                        <div class="source-meta">
                            <span class="source-status active">${indexCountText}</span>
                            <label class="switch">
                                <input type="checkbox" checked class="source-toggle">
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>
                `;
                sourceList.insertAdjacentHTML('beforeend', newSourceHtml);
            }
        });
    }

    // ==========================================
    // Chart Tooltip Hover Management
    // ==========================================
    const chartDots = document.querySelectorAll('.chart-dot');
    const chartTooltip = document.getElementById('chart-tooltip');

    if (chartDots && chartTooltip) {
        chartDots.forEach(dot => {
            dot.addEventListener('mouseenter', () => {
                const tooltipText = dot.getAttribute('data-val');
                chartTooltip.textContent = tooltipText;
                chartTooltip.classList.add('visible');
                
                const dotRect = dot.getBoundingClientRect();
                const containerRect = dot.closest('.visual-chart').getBoundingClientRect();
                const leftPos = dotRect.left - containerRect.left + (dotRect.width / 2);
                const topPos = dotRect.top - containerRect.top;
                
                chartTooltip.style.left = `${leftPos}px`;
                chartTooltip.style.top = `${topPos}px`;
            });

            dot.addEventListener('mouseleave', () => {
                chartTooltip.classList.remove('visible');
            });
        });
    }

    // ==========================================
    // Book a Demo Modal Dialog Control (University Focused)
    // ==========================================
    const modalOverlay = document.getElementById('demo-modal');
    const triggerDemoButtons = document.querySelectorAll('.trigger-demo-modal');
    const modalCloseBtn = document.querySelector('.modal-close');
    const demoForm = document.getElementById('demo-form');
    const modalSuccess = document.getElementById('modal-success');
    const closeSuccessBtn = document.querySelector('.close-success-modal');

    triggerDemoButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modalOverlay.classList.add('active');
            demoForm.style.display = 'flex';
            modalSuccess.style.display = 'none';
        });
    });

    const closeModal = () => {
        modalOverlay.classList.remove('active');
    };

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (closeSuccessBtn) closeSuccessBtn.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    if (demoForm) {
        demoForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('client-name').value;
            const email = document.getElementById('client-email').value;
            const website = document.getElementById('client-website').value;
            const notes = document.getElementById('client-notes').value;

            const targetEmail = 'hello@isomorphic.in';
            const subject = encodeURIComponent(`Bespoke University Chatbot Demo: ${new URL(website).hostname}`);
            
            const body = encodeURIComponent(
                `Hello Isomorphic,\n\n` +
                `I would like to request a chiseled chatbot demo for our institution.\n\n` +
                `--- Institution Details ---\n` +
                `Name & Title: ${name}\n` +
                `Institutional Email: ${email}\n` +
                `University Website: ${website}\n\n` +
                `--- Target Knowledge Focus Areas ---\n` +
                `${notes || 'Train on admissions portals and student guidelines.'}\n\n` +
                `Best regards,\n` +
                `${name}`
            );

            const mailtoUrl = `mailto:${targetEmail}?subject=${subject}&body=${body}`;

            demoForm.style.display = 'none';
            modalSuccess.style.display = 'flex';

            setTimeout(() => {
                window.location.href = mailtoUrl;
            }, 800);
        });
    }
});
