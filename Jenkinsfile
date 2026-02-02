pipeline {
    agent any
    
    environment {
        // Set Node version if needed
        NODE_VERSION = '18'
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Checkout code from your repository
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    // Install Node.js dependencies
                    sh 'npm ci'
                    
                    // Install Playwright browsers
                    sh 'npx playwright install --with-deps'
                }
            }
        }
        
        stage('Run Playwright Tests') {
            steps {
                script {
                    // Run Playwright tests
                    sh 'npx playwright test singletontests/ --headed --workers=1 --project=chromium --reporter=html'
                }
            }
        }
    }
    
    post {
        always {
            // Publish Playwright HTML report
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Test Report'
            ])
            
            // Archive test results
            archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
            
            // Clean up workspace
            cleanWs()
        }
        success {
            echo 'Playwright tests passed successfully!'
        }
        failure {
            echo 'Playwright tests failed. Check the report for details.'
        }
    }
}