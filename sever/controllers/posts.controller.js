const PostsService = require("../services/posts.service");
const PostVerify = require("../verify/postsVerify");
const jwt = require("jsonwebtoken");

class PostsController {
    postsService = new PostsService();
    postVerify = new PostVerify();

    // 데이터베이스의 저장되어 있는 모든 게시글을 가지고 옴
    findAllPost = async (req, res) => {
        const allPost = await this.postsService.findAllPost();

        res.status(200).json({ allPost });
    };

    createPost = async (req, res) => {
        // 바디 값으로 title과 content를 받음
        // authMiddleware를 거치면 nickname과 userId를 locals로 받을 수 있기 때문에 받음
        const { title, content } = req.body;
        const { nickname, userId } = res.locals;

        /*
        postVerify 클래스를 가지고 와서 verifyBody 함수에 title과 content를 보내줌 
        그러면 리턴 값으로 true 또는 false를 보내줌 
         */
        const exsisBody = await this.postVerify.veerifyBody(title, content);

        // exsisBody에서 받은 값으로 조건문을 실행, false가 오면 입력 값을 확인하라고 메시지를 보내줌
        if (!exsisBody) {
            return res.status(400).json({
                errorMessage: "입력값을 확인해주세요",
            });
        }

        // 검증이 통과하면 service 계층으로 인자 값으로 title, content, nickname, userId를 보내줌
        await this.postsService.createPost(title, content, nickname, userId);

        res.status(201).json();
    };

    updatePost = async (req, res) => {
        // 바디 값으로 title과 newContent를 받음
        // authMiddleware를 거치면 userId를 locals로 받을 수 있기 때문에 받음
        // params로 수정해야 될 postId를 받음
        const { postId } = req.params;
        const { title, newContent } = req.body;
        const { userId } = res.locals;

        // 업데이트 하려는 게시글이 존재하는지 검증 postId를 인자로 보내줌 있으면 true 없으면 false를 반환 받음
        const exsisPost = await this.postVerify.exsisPost(postId);

        if (!exsisPost) {
            return res.status(400).json({
                errorMessage: "없는 게시글 입니다.",
            });
        }

        // 본인이 올린 게시글인지 검증, locals로 받은 userId와 postId를 받아서 인자로 보내주고 true or false를 반환 받음
        const verifyPost = await this.postVerify.veerifyPost(userId, postId);

        if (!verifyPost) {
            return res.status(400).json({
                errorMessage: "본인 게시글이 아닙니다.",
            });
        }

        // 인자로 받은 title과 content가 빈값인지 아닌지 검증하고 true or false를 반환
        const exsisConTentTile = await this.postVerify.exsistContentAndTitle(
            title,
            newContent
        );

        if (!exsisConTentTile) {
            return res.status(400).json({
                errorMessage: "입력값을 확인해주세요",
            });
        }

        // 검증 순서에는 이유가 있다 가장 먼저 검증해야 될 부분은 현재 게시글이 존재하는지 아닌지이며
        // 그 다음 검증해야 될 분은 본인 게시글인지 아닌지 마지막으로 검증해야 될 것은 값을 제대로 보내고
        // 있는지 아닌지를 검증해야 한다.

        // 모든 겁증이 통과하면 서비스 계층 클래스에  updatePost 함수에다가 title, newContent, postId를 인자로 보내줌
        await this.postsService.updatePost(title, newContent, postId);

        // 모든 요청이 성공하면 201 status 코드
        res.status(201).json();
    };

    deletePost = async (req, res) => {
        // 바디 값으로 password를 받음
        // authMiddleware를 거치면 userId를 locals로 받을 수 있기 때문에 받음
        // params로 삭제해야 될 postId를 받음
        const { postId } = req.params;
        const { password } = req.body;
        const { userId } = res.locals;

        // 위에 있기 때문에 생략
        const exsisPost = await this.postVerify.exsisPost(postId);

        if (!exsisPost) {
            return res.status(400).json({
                errorMessage: "없는 게시글 입니다.",
            });
        }

        // 위에 있기 때문에 생략
        const verifyPost = await this.postVerify.veerifyPost(userId, postId);

        if (!verifyPost) {
            return res.status(400).json({
                errorMessage: "본인 게시글이 아닙니다.",
            });
        }

        // 바디 값으로 받은 password를 검증하는 부분 인자로 userId와 passoword를 보내줌
        // true 또는 false를 반환
        const verifyPassword = await this.postVerify.verifyPassword(
            userId,
            password
        );

        if (!verifyPassword) {
            return res.status(400).json({
                errorMessage: "비밀번호를 확인해주세요",
            });
        }

        // 검증 순서에는 이유가 있다 가장 먼저 검증해야 될 부분은 현재 게시글이 존재하는지 아닌지이며
        // 그 다음 검증해야 될 분은 본인 게시글인지 아닌지 마지막으로 검증해야 될 것은
        // 비밀번호가 같은지 아닌지이다.

        // 모든 검증에서 통과하면 해당 게시글의 postId를 서비스 계층으로 보내줌
        await this.postsService.deletePost(postId);
        res.status(200).json();
    };

    // 하나의 게시글만 조회하기 위한 api
    findOnePost = async (req, res) => {
        // params로 postId를 받음
        const { postId } = req.params;

        // postId를 서비스 계층에 인자로 보내줌
        const post = await this.postsService.findOnePost(postId);

        // 받은 데이터를 보내줌
        res.status(200).json(post);
    };

    // 게시글을 좋아요 하기 위한 api
    postLike = async (req, res) => {
        // parmas로 postId를 받음
        // authMiddleware를 거쳐서 userId를 받음
        const { postId } = req.params;
        const { userId } = res.locals;

        // 위에 있기 때문에 생략
        const exsisPost = await this.postVerify.exsisPost(postId);

        if (!exsisPost) {
            return res.status(400).json({
                errorMessage: "없는 게시글 입니다.",
            });
        }
        // 좋아요 하기 위해 서비스 계층에 postId와 userId를 보냄
        const Postlike = await this.postsService.postLike(postId, userId);

        // 해당 게시글에 좋아요 했는지 안했는지를 검증해서 이미 좋아요 했으면
        // false를 반환 받고 좋아요 하지 않았다면 true를 받음
        if (!Postlike) {
            return res.status(400).json({
                errorMessage: "이미 좋아요 했습니다.",
            });
        }

        // 모든 검증이 성공하면 status code 201
        res.status(201).json();
    };

    postUnlike = async (req, res) => {
        // parmas로 postId를 받음
        // authMiddleware를 거쳐서 userId를 받음
        const { postId } = req.params;
        const { userId } = res.locals;

        // 위에 있기 때문에 생략
        const exsisPost = await this.postVerify.exsisPost(postId);

        if (!exsisPost) {
            return res.status(400).json({
                errorMessage: "없는 게시글 입니다.",
            });
        }

        // 좋아요 취소하기 위해 서비스 계층에 인자로 postId와 userId를 보내줌
        const postUnlike = await this.postsService.postUnlike(postId, userId);

        if (!postUnlike) {
            // postUnlike가 false면 취소할 종아요가 없다는 것이기 때문에
            // 밑에 코드를 실행
            return res.status(400).json({
                errorMessage: "취소할 좋아요가 없습니다.",
            });
        }

        // 모든 검증을 통과하면 status code
        res.status(200).json();
    };

    getMyPost = async (req, res) => {
        // authMiddleware로 거쳐서 locals에 있는 현재 userId를 받음
        const { userId } = res.locals;

        // 현재 userId를 서비스 계층에 보냄
        const MyPosts = await this.postsService.getMyPost(userId);

        // 가공된 값을 받아서 값을 보내줌
        res.status(200).json({ MyPosts });
    };
}

module.exports = PostsController;
