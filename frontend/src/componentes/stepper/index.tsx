'use client'

import React from 'react'
import clsx from 'clsx'

interface Step {
  number: number
  title: string
  status: 'completed' | 'current' | 'pending'
}

interface StepProgressProps {
  currentStep: number
}

export default function StepProgress({ currentStep }: StepProgressProps) {
  const steps: Step[] = [
    { number: 1, title: 'Informações', status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'current' : 'pending' },
    { number: 2, title: 'Imagem', status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'current' : 'pending' },
    { number: 3, title: 'Prioridade', status: currentStep === 3 ? 'current' : 'pending' },
  ]

  return (
    <div className="flex items-start max-w-screen-lg mx-auto mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="w-full flex items-start">
          <div className="w-full">
            <div className="flex items-center gap-3 w-full">
              <div className={clsx(
                'w-7 h-7 shrink-0 mx-[-1px] flex items-center justify-center rounded-full',
                {
                  'bg-[#963d40] text-white': step.status !== 'pending',
                  'bg-gray-300 text-white': step.status === 'pending',
                }
              )}>
                <span className="text-sm font-semibold">{step.number}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={clsx(
                  'w-full h-[3px] mx-4 rounded-lg',
                  step.status !== 'pending' ? 'bg-[#963d40]' : 'bg-gray-300'
                )}></div>
              )}
            </div>
            <div className="mt-2 mr-4">
              <h6 className={clsx(
                'text-sm font-semibold',
                step.status !== 'pending' ? 'text-[#963d40]' : 'text-gray-500'
              )}>
                {step.title}
              </h6>
              <p className="text-xs text-gray-500">
                {step.status === 'completed' ? 'Concluído' : step.status === 'current' ? 'Atual' : 'Pendente'}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
