import MUtil from 'util/mm.jsx'

const _mm = new MUtil();

class Product{
    getProductList(param){
        let url ='';
        let data = {
            pageNum : param.pageNum
        };
        if(param.listType == 'list'){
            url = "/manage/product/list.do"
        }else{
            url = "/manage/product/search.do"
            data[param.searchType] = param.searchKeyword;
        }
        return _mm.request({
            type:"post",
            url,
            data
        })
    }

    setProductStatus(data){
        return _mm.request({
            type:"post",
            url:"/manage/product/set_sale_status.do",
            data
        })
    }

    getCategoryList(parentCategoryId){
        return _mm.request({
            type:"post",
            url:"/manage/category/get_category.do",
            data:{
                categoryId:parentCategoryId || 0
            }
        })
    }

    checkProduct(product){
        let result = {
            status : true,
            msg:"验证通过"
        }

        if(typeof product.name != "string" || product.name.length == 0){
            return {
                status: false,
                msg:"商品名称不能为空"
            }
        }
        if(typeof product.subtitle != "string" || product.subtitle.length == 0){
            return {
                status: false,
                msg:"商品描述不能为空"
            }
        }

        if(typeof product.price != "number" || product.price < 0){
            return {
                status: false,
                msg:"商品价格需大于等于0"
            }
        }

        if(typeof product.stock != "number" || product.stock < 0){
            return {
                status: false,
                msg:"库存需大于等于0"
            }
        }

        console.log("product.categoryId",product.categoryId)
        if(typeof product.categoryId != "number" || product.categoryId < 0){
            return {
                status: false,
                msg:"请选择商品分类"
            }
        }

        return result;
    }

    saveProduct(product){
        return _mm.request({
            type:"post",
            url:"/manage/product/save.do",
            data:product
        })
    }

    getProduct(productId){
        console.log("productId",productId)
        return _mm.request({
            type:"post",
            url:"/manage/product/detail.do",
            data:{
                productId
            }
        })
    }
}

export default new Product();