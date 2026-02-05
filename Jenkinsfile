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
                    // sh 'npx playwright test --grep @final_assignment_1 --headed --workers=1 --project=chromium --reporter=html'
                    sh 'npx playwright test --grep @final_assignment_2 --headed --workers=1 --project=chromium --reporter=html'
                    sh 'npx playwright test --grep @final_assignment_3 --headed --workers=1 --project=chromium --reporter=html'
                    sh 'npx playwright test --grep @final_assignment_4 --headed --workers=1 --project=chromium --reporter=html'
                }
            }
        }
    }
    
}