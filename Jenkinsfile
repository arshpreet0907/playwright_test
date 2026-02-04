pipeline {
    agent any
    
    environment {
        NODE_VERSION = '25.5.1'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm ci'
                    
                    sh 'npx playwright install --with-deps'
                }
            }
        }
        
        stage('Run Playwright Tests') {
            steps {
                script {
                    sh 'npx playwright test FinalAssignment/Assignment_1.spec.ts --headed --workers=1 --project=chromium --reporter=html'
                    sh 'npx playwright test FinalAssignment/Assignment_2.spec.ts --headed --workers=1 --project=chromium --reporter=html'
                    sh 'npx playwright test FinalAssignment/Assignment_3.spec.ts --headed --workers=1 --project=chromium --reporter=html'
                    sh 'npx playwright test FinalAssignment/Assignment_4.spec.ts --headed --workers=1 --project=chromium --reporter=html'
                }
            }
        }
    }
    
}