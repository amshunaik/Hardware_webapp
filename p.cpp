#include<iostream>
#include<bits/stdc++.h>
using namespace std;
int find(int n,vector<int>&h,vector<int>&dp){
    if(n==0){
        return 0;
    }
    int left=find(n-1,h,dp)+abs(h[n]-h[n-1]);
    int right;
    if(n==1){
         right=INT_MAX;
    }
    if(n>1){
         right=find(n-2,h,dp)+abs(h[n]-h[n-2]);
    }
    return dp[n]=min(left,right);


}
int main(){
    int  n=5;//5
    vector<int>h={10,20,30,60,20};
    vector<int>dp(n+1.-1);
    find(n-1,h,dp);

}