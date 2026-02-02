pipeline {
    agent any
    
    environment {
        NODE_VERSION = '25.5.1'
        // Use cached browser location
        PLAYWRIGHT_BROWSERS_PATH = '/var/lib/jenkins/playwright-browsers'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                // Only install npm packages (playwright is already in package.json)
                sh 'npm ci'
            }
        }
        
        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test singletontests/ --headed --workers=1 --project=chromium --reporter=html'
            }
        }
    }
}