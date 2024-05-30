import React from 'react'
import { Steps } from 'antd';

const StepperReact = ({value}) => {
    const Step = Steps.Step;
  return (
    <div className="py-7 px-7">
    <Steps current={value}>
    <Step title="Shipping" description="" />
    <Step title="Confirm Order" description="" />
    <Step title="Payment" description="" />
  </Steps>
  </div>
  )
}

export default StepperReact;