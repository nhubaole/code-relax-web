import { useContext } from 'react'
import { LoaderContext } from '../context/LoaderContext'
export const Loader = () => {
  const { isLoading, loaderText } = useContext(LoaderContext)
  return (
    <>
      {isLoading ? (
        <div className='text-gray text-9xl'>
          {loaderText}
        </div>
      ) : null}
    </>
  )
}