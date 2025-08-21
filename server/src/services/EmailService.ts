// EmailService.ts - Unified Email Service with best practices
import nodemailer, { Transporter } from 'nodemailer'

import logger from '../utils/logger'
import Admin from '../models/Admin'

interface EmailConfig {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
  tls?: {
    rejectUnauthorized?: boolean
  }
}

interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
  attachments?: Array<{
    filename: string
    content: Buffer
    contentType: string
  }>
}



export class EmailService {
  private transporter: Transporter
  private config: EmailConfig
  private static instance: EmailService

  constructor(private readonly clientUrl: string) {
    this.config = this.getEmailConfig()
    this.transporter = this.createTransporter()
  }

  // Singleton pattern for EmailService
  public static getInstance(clientUrl?: string): EmailService {
    if (!EmailService.instance) {
      if (!clientUrl) {
        throw new Error('ClientUrl is required for first EmailService instantiation')
      }
      EmailService.instance = new EmailService(clientUrl)
    }
    return EmailService.instance
  }

  private getEmailConfig(): EmailConfig {
    const requiredEnvVars = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS']
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName])

    // if (missingVars.length > 0) {
    //   throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`)
    // }

    return {
      host: 'mail.privateemail.com', // Namecheap Private Email SMTP
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'support@klitzcybersecurity.com', // Your Namecheap email
    pass: 'moneyafterGOD4L'  // Your email password
  },
  tls: {
    rejectUnauthorized: false // Only if you encounter certificate issues
  }
  }
}

  private createTransporter(): Transporter {
    const transporter = nodemailer.createTransport(this.config)

    // Verify connection configuration on startup
    transporter.verify((error: any) => {
      if (error) {
        logger.error('SMTP connection failed', {
          error: error.message,
          host: this.config.host,
          port: this.config.port,
        })
      } else {
        logger.info('SMTP server is ready to send emails')
      }
    })

    return transporter
  }
  private async sendEmail(options: EmailOptions): Promise<void> {
    try {
      const mailOptions = {
        
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text || this.stripHtml(options.html),
        attachments: options.attachments || [],
      }

      const info = await this.transporter.sendMail(mailOptions)

      logger.info('Email sent successfully', {
        messageId: info.messageId,
        to: options.to,
        subject: options.subject,
        response: info.response,
      })
    } catch (error: any) {
      logger.error('Failed to send email', {
        to: options.to,
        subject: options.subject,
        error: error.message,
        stack: error.stack,
      })
      throw new Error(`Failed to send email to ${options.to}: ${error.message}`)
    }
  }

  private stripHtml(html: string): string {
    return html
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .trim()
  }

  // Email Templates
  private getBaseEmailStyles(): string {
    return `
      <style>
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          margin: 0; 
          padding: 0; 
          background-color: #f4f4f4;
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          background: white; 
          border-radius: 8px; 
          overflow: hidden; 
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .header { 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white; 
          padding: 30px 20px; 
          text-align: center; 
        }
        .content { padding: 30px; }
        .button { 
          display: inline-block; 
          background: #007bff; 
          color: white !important; 
          padding: 12px 24px; 
          text-decoration: none; 
          border-radius: 6px; 
          margin: 20px 0;
          font-weight: 600;
          transition: background-color 0.3s;
        }
        .button:hover { background: #0056b3; }
        .button.danger { background: #dc3545; }
        .button.danger:hover { background: #c82333; }
        .button.success { background: #28a745; }
        .button.success:hover { background: #218838; }
        .details-box { 
          background: #f8f9fa; 
          padding: 20px; 
          border-radius: 6px; 
          margin: 20px 0;
          border-left: 4px solid #007bff;
        }
        .warning-box { 
          background: #fff3cd; 
          border: 1px solid #ffeaa7; 
          padding: 15px; 
          border-radius: 6px; 
          margin: 20px 0;
          border-left: 4px solid #ffc107;
        }
        .error-box {
          background: #f8d7da;
          border: 1px solid #f5c6cb;
          padding: 15px;
          border-radius: 6px;
          margin: 20px 0;
          border-left: 4px solid #dc3545;
        }
        .footer { 
          background: #f8f9fa;
          padding: 20px; 
          text-align: center;
          font-size: 12px; 
          color: #666; 
          border-top: 1px solid #eee;
        }
        .text-center { text-align: center; }
        .mt-0 { margin-top: 0; }
      </style>
    `
  }

  // Verification Email
  async sendVerificationEmail(user: Admin): Promise<void> {
    try {
      const verificationUrl = `${this.clientUrl}/verify-email?token=${user.verificationToken}`
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            ${this.getBaseEmailStyles()}
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">Welcome ${user.username}!</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Please verify your email address</p>
              </div>
              
              <div class="content">
                <p>Thank you for signing up! To complete your registration, please verify your email address.</p>
                
                <div class="details-box">
                  <h3 class="mt-0">Verification Code</h3>
                  <p style="font-size: 24px; font-weight: bold; color: #007bff; margin: 10px 0;">${user.verificationCode}</p>
                  <p><em>You can also use the button below for quick verification</em></p>
                </div>
                
                <div class="text-center">
                  <a href="${verificationUrl}" class="button">Verify Email Address</a>
                </div>
                
                <p><strong>Alternative method:</strong> Copy and paste this link in your browser:</p>
                <p style="word-break: break-all; color: #007bff; background: #f8f9fa; padding: 10px; border-radius: 4px;">${verificationUrl}</p>
                
                <div class="warning-box">
                  <strong>⚠️ Important:</strong>
                  <ul style="margin: 10px 0;">
                    <li>This verification link will expire in 24 hours</li>
                    <li>Your account will remain inactive until verified</li>
                  </ul>
                </div>
              </div>
              
              <div class="footer">
                <p>If you didn't create this account, please ignore this email.</p>
                <p>&copy; ${new Date().getFullYear()} Admissions Portal. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `

      await this.sendEmail({
        to: user.email,
        subject: 'Verify Your Email Address - Admissions Portal',
        html,
      })

      logger.info('Verification email sent successfully', {
        userId: user.id,
        email: user.email,
      })
    } catch (error: any) {
      logger.error('Failed to send verification email', {
        userId: user.id,
        email: user.email,
        error: error.message,
      })
      throw new Error('Failed to send verification email')
    }
  }

  // Password Reset Email
  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    try {
      const resetUrl = `${this.clientUrl}/auth/reset-password?token=${token}`
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            ${this.getBaseEmailStyles()}
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">Password Reset Request</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Secure password reset for your account</p>
              </div>
              
              <div class="content">
                <p>We received a request to reset your password. Click the button below to create a new password:</p>
                
                <div class="text-center">
                  <a href="${resetUrl}" class="button danger">Reset Password</a>
                </div>
                
                <p><strong>Alternative method:</strong> Copy and paste this link in your browser:</p>
                <p style="word-break: break-all; color: #dc3545; background: #f8f9fa; padding: 10px; border-radius: 4px;">${resetUrl}</p>
                
                <div class="error-box">
                  <strong>🔒 Security Notice:</strong>
                  <ul style="margin: 10px 0;">
                    <li>This link will expire in 1 hour for security</li>
                    <li>This link can only be used once</li>
                    <li>If you didn't request this reset, please ignore this email</li>
                    <li>Your current password remains unchanged until you complete the reset</li>
                  </ul>
                </div>
              </div>
              
              <div class="footer">
                <p>If you're having trouble with the button above, copy and paste the URL into your web browser.</p>
                <p>&copy; ${new Date().getFullYear()} Admissions Portal. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `

      await this.sendEmail({
        to: email,
        subject: 'Password Reset Request - Admissions Portal',
        html,
      })

      logger.info('Password reset email sent successfully', { email })
    } catch (error: any) {
      logger.error('Failed to send password reset email', {
        email,
        error: error.message,
      })
      throw new Error('Failed to send password reset email')
    }
  }

  // Generic method for custom emails
  async sendCustomEmail(
    to: string,
    subject: string,
    html: string,
    text?: string,
    attachments?: Array<{ filename: string; content: Buffer; contentType: string }>
  ): Promise<void> {
    try {
      await this.sendEmail({ to, subject, html, text, attachments })
      logger.info('Custom email sent successfully', { to, subject })
    } catch (error: any) {
      logger.error('Failed to send custom email', {
        to,
        subject,
        error: error.message,
      })
      throw new Error('Failed to send custom email')
    }
  }

  // Bulk email method
  async sendBulkEmails(emails: EmailOptions[]): Promise<{
    successful: number
    failed: Array<{ email: string; error: string }>
  }> {
    const results = {
      successful: 0,
      failed: [] as Array<{ email: string; error: string }>,
    }

    for (const emailOptions of emails) {
      try {
        await this.sendEmail(emailOptions)
        results.successful++
      } catch (error: any) {
        results.failed.push({
          email: emailOptions.to,
          error: error.message,
        })
      }
    }

    logger.info('Bulk email operation completed', {
      total: emails.length,
      successful: results.successful,
      failed: results.failed.length,
    })

    return results
  }

  // Test email connection
  async testConnection(): Promise<boolean> {
    try {
      await this.transporter.verify()
      logger.info('Email service connection test passed')
      return true
    } catch (error: any) {
      logger.error('Email service connection test failed', {
        error: error.message,
        config: {
          host: this.config.host,
          port: this.config.port,
          user: this.config.auth.user,
        },
      })
      return false
    }
  }

  // Health check method
  async healthCheck(): Promise<{
    status: 'healthy' | 'unhealthy'
    message: string
    timestamp: Date
  }> {
    try {
      const isConnected = await this.testConnection()
      return {
        status: isConnected ? 'healthy' : 'unhealthy',
        message: isConnected ? 'Email service is operational' : 'Email service connection failed',
        timestamp: new Date(),
      }
    } catch (error: any) {
      return {
        status: 'unhealthy',
        message: `Email service error: ${error.message}`,
        timestamp: new Date(),
      }
    }
  }
}

// Update your Payment model to include these new fields:
export interface PaymentAttributes {
  id: string
  reference: string
  amount: number
  currency?: string
  status: 'PENDING' | 'PAID' | 'FAILED'
  sessionId: string
  programId: string
  applicantUserId: string
  paidAt?: Date
  receiptFileId?: string // New field
  receiptLink?: string // New field
  receiptGeneratedAt?: Date // New field
  createdAt: Date
  updatedAt: Date
}