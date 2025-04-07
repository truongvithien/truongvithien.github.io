import { NavLink } from 'react-router-dom'

const tabs = [
  { path: '/', label: 'Home' },
  { path: '/products', label: 'Products' },
  { path: '/prompts', label: 'Prompts' },
  { path: '/mini-tools', label: 'Mini Tools' },
]

export default function TabNav() {
  return ( 
    <div className="flex gap-4 border-b px-4 pb-1 border-gray-200">
      {tabs.map(tab => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) =>
            `py-1 text-sm font-medium ${
              isActive ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
            }`
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  )
}