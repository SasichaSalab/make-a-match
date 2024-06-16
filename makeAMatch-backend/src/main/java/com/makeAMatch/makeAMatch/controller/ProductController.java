package com.makeAMatch.makeAMatch.controller;

import com.makeAMatch.makeAMatch.model.*;
import com.makeAMatch.makeAMatch.repository.ProductRepository;
import com.makeAMatch.makeAMatch.service.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController {
    private final ProductService productService;
    private final ProductDetailService productDetailService;

    private final ProductSizeService productSizeService;
    private final FavoriteService favoriteService;

    private final MatchProductDetailService matchProductDetailService;

    public ProductController(ProductService productService, ProductDetailService productDetailService, ProductSizeService productSizeService, FavoriteService favoriteService, MatchProductDetailService matchProductDetailService) {
        this.productService = productService;
        this.productDetailService = productDetailService;
        this.productSizeService = productSizeService;
        this.favoriteService = favoriteService;
        this.matchProductDetailService = matchProductDetailService;
    }
    @GetMapping("/user/alone")
    public ResponseEntity<Object> userAlone(){
        return ResponseEntity.ok("Users alone can access this ApI only");
    }

    @GetMapping("/product")
    public List<Product> getAllProducts(@RequestParam(name = "color",required = false) String color,
                                        @RequestParam(name = "size",required = false) Size size){
        return productService.getAllProducts(color, size);
    }
    @GetMapping("/product/productId/{id}")
    public Product getProductById(@PathVariable long id){
        return productService.getProductById(id);
    }
    @GetMapping("/product/{tag}")
    public List<Product> getAllByTag(@PathVariable(name = "tag",required = false) Tag tag,
                                     @RequestParam(name = "color",required = false) String color,
                                     @RequestParam(name = "size",required = false) Size size){
        return productService.getAllByTag(tag,color,size);
    }

    @GetMapping("/product/colors")
    public List<String> getAllColors(){
        return productDetailService.findAllColors();
    }

    @GetMapping("/product/sizes")
    public List<String> getAllSizes(){
        return productSizeService.getAllSize();
    }

    @GetMapping("/product/search/{key}")
    public List<Product> searchProducts(@PathVariable(name = "key") String key){
        return productService.searchProducts(key);
    }

    @PostMapping("/admin/product")
    public ResponseEntity<Product> createProduct(@RequestBody Product product){
        Product savedProduct= productService.saveProduct(product);
        for (ProductDetail detail: product.getDetails()){
            detail.setProduct(savedProduct);
            ProductDetail savedDetail = productDetailService.saveProductDetail(detail);
            for (ProductSize size: detail.getProductSizes()){
                size.setSizeProduct(savedDetail);
                ProductSize savedProductSize=productSizeService.saveProductSize(size);
            }
        }
        return new ResponseEntity<Product>(savedProduct, HttpStatus.CREATED);
    }

    @PutMapping("/admin/product/{productId}")
    public ResponseEntity<?> updateProduct(@PathVariable(name = "productId") long productId, @RequestBody Product updatedProduct) {
        try {
            Product product = productService.updateProduct(updatedProduct,productId);
            return ResponseEntity.ok(product);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found with id: " + productId);
        }
    }

    @DeleteMapping("/admin/product/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id")long id){
        List<Long> list=favoriteService.getFavoriteIdFormProductId(id);
        for(long f:list){
            favoriteService.deleteFavorite(f);
        }
        List<MatchProductDetail> m=matchProductDetailService.getMatchProductDetailIdFormProductSizeId(id);
        for(MatchProductDetail match:m){
            matchProductDetailService.deleteMatchProductDetail(match.getMatch_product_detail_id());
        }
        productService.deleteProduct(id);
        return new ResponseEntity<String>("Product Delete Successfully!",HttpStatus.OK);
    }

    @GetMapping("/admin/sum/shoes")
    public int getSumOfProductsByShoes(){
        return productService.getSumOfProductsByTag(Tag.SHOES);
    }
    @GetMapping("/admin/sum/hat")
    public int getSumOfProductsByHat(){
        return productService.getSumOfProductsByTag(Tag.HAT);
    }

    @GetMapping("/admin/sum/shirt")
    public int getSumOfProductsByShirt(){
        return productService.getSumOfProductsByTag(Tag.SHIRT);
    }
    @GetMapping("/admin/sum/pants")
    public int getSumOfProductsByPants(){
        return productService.getSumOfProductsByTag(Tag.PANTS);
    }


    @GetMapping("/admin/sumAll")
    public int getSumOfAllProducts(){
        return productService.getSumOfAllProducts();
    }




}
