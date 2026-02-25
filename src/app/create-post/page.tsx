
import { CreatePostForm } from './CreatePostForm'
import { createPost } from './actions'

export default async function PageIsr() {
    return (
        <div className="flex justify-center">
            <div className="mt-24 max-w-2xl w-full">
                <CreatePostForm action={createPost} />
            </div>
        </div>
    )
}