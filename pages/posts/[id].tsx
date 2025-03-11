import { GetStaticPaths, GetStaticProps } from 'next';
import { getSortedPostsData, getPostData } from '../../lib/posts';
import { PostData } from '../../lib/posts';
import remarkHtml from 'remark-html';
import remarkParse from 'remark-parse';
import { unified } from 'unified';

export default function Post({ postData }: { postData: PostData & { contentHtml: string } }) {
    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-4">{postData.title}</h1>
            <p className="text-sm text-gray-600 mb-8">{postData.date}</p>
            <div
                className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl"
                dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
            />
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = getSortedPostsData();
    const paths = posts.map((post) => ({
        params: { id: post.id },
    }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postData = await getPostData(params?.id as string);
    return {
        props: {
            postData,
        },
    };
};
