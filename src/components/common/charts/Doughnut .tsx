import { Doughnut } from 'react-chartjs-2'

const data = {
  labels: ['Usuarios'],
  datasets: [
    {
      label: 'Numero de usuarios',
      data: [12],

      backgroundColor: ['rgba(255, 99, 132, 0.2)'],
      borderColor: ['rgba(255, 99, 132, 1)'],
      borderWidth: 1

    }
  ]
}

export const DoughnutChart = () => (
  <div>
    <Doughnut data={data} />
  </div>
)
