'use client'

import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { motion } from 'framer-motion'

interface PayPalButtonProps {
  amount: number
  description: string
  onSuccess: (orderId: string) => void
  onError: (message: string) => void
}

function PayPalButtonInner({ amount, description, onSuccess, onError }: PayPalButtonProps) {
  const [{ isPending, isRejected }] = usePayPalScriptReducer()

  if (isRejected) {
    return (
      <div className="p-4 bg-red-900/20 border border-red-800/40 rounded-xl text-red-400 text-sm text-center">
        PayPal failed to load. Please check your connection and refresh the page.
      </div>
    )
  }

  return (
    <div>
      {isPending && (
        <div className="flex items-center justify-center py-8">
          <div className="spinner" />
          <span className="ml-3 text-text-muted text-sm">Loading PayPal...</span>
        </div>
      )}
      <div className={isPending ? 'hidden' : 'block'}>
        <PayPalButtons
          style={{
            layout: 'vertical',
            color: 'gold',
            shape: 'rect',
            label: 'pay',
            height: 48,
          }}
          createOrder={(_data, actions) => {
            return actions.order.create({
              intent: 'CAPTURE',
              purchase_units: [
                {
                  description,
                  amount: {
                    currency_code: 'USD',
                    value: amount.toFixed(2),
                  },
                },
              ],
            })
          }}
          onApprove={async (_data, actions) => {
            try {
              if (!actions.order) throw new Error('No order actions available')
              const order = await actions.order.capture()
              onSuccess(order.id ?? 'unknown')
            } catch {
              onError('Payment capture failed. Please try again.')
            }
          }}
          onError={() => {
            onError('An error occurred during payment. Please try again.')
          }}
          onCancel={() => {
            onError('Payment was cancelled.')
          }}
        />
      </div>
    </div>
  )
}

export default function PayPalButton(props: PayPalButtonProps) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'sb'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl overflow-hidden"
    >
      <div className="bg-surface-2 border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-sm font-medium text-text-muted">Secure Payment via PayPal</span>
        </div>
        <PayPalScriptProvider
          options={{
            clientId,
            currency: 'USD',
            intent: 'capture',
          }}
        >
          <PayPalButtonInner {...props} />
        </PayPalScriptProvider>
        <p className="text-text-dim text-xs text-center mt-4">
          Your payment is protected by PayPal&apos;s Buyer Protection. SSL encrypted.
        </p>
      </div>
    </motion.div>
  )
}
